let downloadbtn = document.getElementById("downloadfile");
let generatedHTML = "";

async function askGemini() {
    const status = document.getElementById("status");
    const responseBox = document.getElementById("response");
    const prompt = document.getElementById("prompt").value.trim();
    const source = document.getElementById("source").value.trim();
    const focuspoint = document.getElementById("focus").value.trim();

    responseBox.innerHTML = '';

    if (!prompt) {
        status.textContent = "Please enter a concept.";
        return;
    }

    const conceptPrompt = `Create a single self-contained HTML snippet that visualizes the concept "${prompt}".`;
    const sourcePrompt = source && source.toUpperCase() !== "N/A"
        ? `Use this source for context: ${source}.`
        : "";
    const focusPrompt = focuspoint && focuspoint.toUpperCase() !== "N/A"
        ? `and specifically focus on explaining ${focuspoint}.`
        : "";
    const finalPrompt = `${conceptPrompt}\n\n${sourcePrompt}\n\n${focusPrompt}\n\n. Return ONLY the HTML snippet, with no markdown fences and no explanation. Do not include <html>, <head>, <body>, or <title> tags. Use one root container such as a div, svg, or canvas. Make it work when inserted into an existing webpage and keep it complete and self-contained.`;

    status.textContent = "Generating...";
    responseBox.innerHTML = "";

    try {
        const response = await fetch('/api/generate', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                finalPrompt: finalPrompt
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.error?.message || "Request failed.");
        }

        const rawReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
        let cleanReply = rawReply
            .replace(/^```(?:html)?\s*/i, "")
            .replace(/```$/i, "")
            .trim();

        if (!cleanReply) {
            throw new Error("The model returned an empty response.");
        }

        const iframe = document.createElement("iframe");
        iframe.srcdoc = `<!doctype html>
            <html>
                <head>
                    <style>
                        body { margin: 0; padding: 16px; font-family: "Elms Sans", monospace; background: transparent; color: #49516F; box-sizing: border-box; }
                        * { box-sizing: border-box; }
                    </style>
                </head>
                <body>${cleanReply}</body>
            </html>`;
        generatedHTML = cleanReply;
        iframe.setAttribute("sandbox", "allow-scripts");
        iframe.style.width = "100%";
        iframe.style.minHeight = "700px";
        iframe.style.border = "0";
        iframe.style.borderRadius = "16px";
        iframe.style.background = "white";

        responseBox.appendChild(iframe);
        status.textContent = "Simulation ready.";
        console.log(data);
    } catch (error) {
        status.textContent = `Error: ${error.message}`;
        console.error(error);
    }
}

downloadbtn.addEventListener("click", () => {
    const htmlCode = generatedHTML;
    const blob = new Blob([htmlCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "simulation.html";
    link.click();
    URL.revokeObjectURL(url);
});