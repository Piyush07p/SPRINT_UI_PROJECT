let bills = [
    { consumerNo: "12345", billNo: "B1001", status: "Unpaid", type: "Domestic", connection: "Connected", mobile: "9876543210", period: "Jan-Feb", billDate: "01/03/2024", dueDate: "15/03/2024", disconnectionDate: "-", dueAmount: 500 },
    { consumerNo: "67890", billNo: "B1002", status: "Paid", type: "Commercial", connection: "Disconnected", mobile: "9876543222", period: "Feb-Mar", billDate: "01/04/2024", dueDate: "15/04/2024", disconnectionDate: "20/04/2024", dueAmount: 800 }
];

let totalPayable = 0;

function updateTotal() {
    totalPayable = 0;
    document.querySelectorAll(".bill-checkbox:checked").forEach(checkbox => {
        let row = checkbox.closest("tr");
        let payableAmount = parseFloat(row.querySelector(".payable-amount").value) || 0;
        totalPayable += payableAmount;
    });
    document.getElementById("totalAmount").textContent = totalPayable;
    document.getElementById("proceedToPay").disabled = totalPayable === 0;
}

function loadBills() {
    let tableBody = document.getElementById("billTable");
    tableBody.innerHTML = "";
    
    bills.forEach(bill => {
        let row = `<tr>
            <td><input type="checkbox" class="bill-checkbox" onchange="updateTotal()"></td>
            <td>${bill.consumerNo}</td>
            <td>${bill.billNo}</td>
            <td>${bill.status}</td>
            <td>${bill.type}</td>
            <td>${bill.connection}</td>
            <td>${bill.mobile}</td>
            <td>${bill.period}</td>
            <td>${bill.billDate}</td>
            <td>${bill.dueDate}</td>
            <td>${bill.disconnectionDate}</td>
            <td>${bill.dueAmount}</td>
            <td><input type="number" class="payable-amount" value="${bill.dueAmount}" min="0" max="${bill.dueAmount}" onchange="updateTotal()"></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

document.getElementById("proceedToPay").addEventListener("click", function() {
    
    window.location.href = "/pages/view_bill_summary.html";
});

loadBills();