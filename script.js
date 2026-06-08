 // ---------------- ADD PRODUCT ----------------
function addProduct(){

    const pidVal = document.getElementById("pid").value.trim();
    const nameVal = document.getElementById("name").value.trim();
    const priceVal = document.getElementById("price").value.trim();
    const qtyVal = document.getElementById("qty").value.trim();

    if (!pidVal || !nameVal || !priceVal || !qtyVal){
        alert("All fields required");
        return;
    }

    fetch("/add_product",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            pid: Number(pidVal),
            name: nameVal,
            price: Number(priceVal),
            quantity: Number(qtyVal)
        })
    })
    .then(r=>r.json())
    .then(d=>{
        alert(d.msg);
        location.reload();
    })
    .catch(err=>{
        console.error(err);
        alert("Error adding product");
    });
}


// ---------------- BILL ----------------
function bill(){

    const cnameVal = document.getElementById("cname").value.trim();
    const ageVal = document.getElementById("age").value.trim();
    const productVal = document.getElementById("product").value;
    const qtyVal = document.getElementById("qty").value.trim();

    if (!cnameVal || !ageVal || !qtyVal){
        alert("Fill all fields");
        return;
    }

    fetch("/bill",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            cname: cnameVal,
            age: Number(ageVal),
            product: productVal,
            qty: Number(qtyVal)
        })
    })
    .then(r=>r.json())
    .then(d=>{
        if(d.status==="error"){
            alert(d.msg);
        } else {
            document.getElementById("bill").innerText =
                "Bill Generated! Total = ₹" + d.total;

            location.reload();
        }
    })
    .catch(err=>{
        console.error(err);
        alert("Billing failed");
    });
}


// ---------------- ANALYSIS ----------------
 function runAnalysis(){
    fetch("/analysis").then(r=>r.json()).then(d=>{
        document.getElementById("analysisResult").innerText =
        "Top Product: "+d.top_product+" | Total Sales: ₹"+d.total_sales;

        new Chart(document.getElementById("ageChart"),{
            type:'bar',
            data:{
                labels:Object.keys(d.age),
                datasets:[{data:Object.values(d.age)}]
            }
        });

        fetch("/product_chart").then(r=>r.json()).then(p=>{
            new Chart(document.getElementById("salesChart"),{
                type:'pie',
                data:{
                    labels:Object.keys(p),
                    datasets:[{data:Object.values(p)}]
                }
            });
        });
    });
}