const calculateTotalProfit = async()=>{
    const token = localStorage.getItem("token");
    const {data} =await axios.get('http://localhost:3000/order/calculateTotalProfit',{
        headers:{authorization:`Library__${token}`}
    });
    document.querySelector(".totalProfit").textContent=data.totalProfit + "$";
}


calculateTotalProfit();
const getOrderStatistics = async () => {
    try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get('http://localhost:3000/order/getOrderStatistics', {
            headers: { authorization: `Library__${token}` }
        });

        const tableBody = document.querySelector("#tableBody");
        console.log(data);
        data.bookOrderStatistics.forEach((statistic) => {
            tableBody.innerHTML += `
                <tr>
                    <td>${statistic.bookName}</td>
                    <td>${statistic.orderCount}</td>
                    <td>${statistic.orderType || "N/A"}</td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

calculateTotalProfit();


getOrderStatistics();


const getUserOrdersCount = async () => {
    try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get('http://localhost:3000/order/getUserOrdersCount', {
            headers: { authorization: `Library__${token}` }
        });

        const tableBody = document.querySelector(".tableBody");
        console.log(data);
        data.userOrdersCount.forEach((userStatistic) => {
            tableBody.innerHTML += `
                <tr>
                    <td>${userStatistic.user.userName}</td>
                    <td>${userStatistic.totalOrders}</td>
                    <td>${userStatistic.borrowOrders}</td>
                    <td>${userStatistic.purchaseOrders}</td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

getUserOrdersCount();

