let userForm = document.getElementById("user-form");
uservals= JSON.parse(localStorage.getItem("user-vals")) || [];
localStorage.clear()
function displayvals()
{
    let retrivevals=JSON.parse(localStorage.getItem("user-vals"));
    if(retrivevals==[])
    {
        return
    }
    let tableentries =retrivevals.map((retrivevals)=>
    {
        const namecell=`<td class='border px-4 py-2'>${retrivevals.name}</td>`
        const emailcell=`<td class='border px-4 py-2'>${retrivevals.email}</td>`
        const passcell=`<td class='border px-4 py-2'>${retrivevals.password}</td>`
        const datecell=`<td class='border px-4 py-2'>${retrivevals.date}</td>`
        const acceptancecell=`<td class='border px-4 py-2'>${retrivevals.acceptance}</td>`
        const row=`<tr>${namecell} ${emailcell} ${passcell} ${datecell} ${acceptancecell}</tr>`
        return row;
    }).join("\n")

    const table=`</tr>${tableentries} </tr>`


    let details=document.getElementById("user-vals");
    details.innerHTML=table;
}
function saveForm(event)
{
    event.preventDefault();
    const name=document.getElementById("name").value;
    const password=document.getElementById("pass").value;
    const email=document.getElementById("mail").value;
    const date=document.getElementById("date").value;
    const acceptance=document.getElementById("check").checked;
    const vals={
        name,
        email,
        password,
        date,
        acceptance
    }
    uservals.push(vals);
    localStorage.setItem("user-vals",JSON.stringify(uservals));
    displayvals()
}

formStore.addEventListener("submit" ,saveForm);
displayvals()
