document.getElementById("transactionId").textContent = new URLSearchParams(window.location.search).get("transactionId") || "N/A";
        
document.getElementById("downloadBtn").addEventListener("click", function() {
    const invoiceContent = document.querySelector(".container").innerHTML;
    const blob = new Blob([invoiceContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "invoice.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});