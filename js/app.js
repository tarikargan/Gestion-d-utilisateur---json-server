const slcEl = (el) =>{ return document.querySelector(el)}
const slcElAll = (el) =>{ return document.querySelectorAll(el)}


const tableBody = slcEl('.table tbody');
var users = [];


const url = "http://localhost:3000/users";

// >>>>>> Get Method 
    fetch(url)
    .then(res => res.json())
    .then(data => {
        //clone data at global variable 
          users = [...data];
        // run createTable
        createTable();
     })

   

    // create users table 
    function createTable(){
      
        var output ="";

      if(users.length > 0){
        users.forEach((user) => {
            output +=
            `<tr>
                 <td scope="col">${user.id}</td>
                 <td scope="col">${realDate(user.createdDate)}</td>
                 <td scope="col">
                         <span class="badge ${realClass(user.status)}">${user.status}</span>
                 </td>
                 <td scope="col">${user.firstName}</td>
                 <td scope="col">${user.lastName}</td>
                 <td scope="col">${user.userName}</td>
                 <td scope="col">${user.registrationNumber}</td>
                 <th scope="col">
                     <button class="btn btn-white delete_user" onclick="deleteUser(${user.id})"><i class="fa fa-trash" aria-hidden="true"></i></button>
                 </th>
            </tr>`;
         });
      }else{
        output +=`<tr>
                     <td colspan="8" class="text-center text-danger">sorry no users to list</td>
                 </tr>`;
      }

      tableBody.innerHTML = output;
    
    }

    //get status class
    function realClass(status){
        if(status.match(/é/gi) != null && status.match(/é/gi).length > 0){
            status = status.replace(/é/g,"e");
        }
        status = status.replace(" ","-").toLowerCase();
        return status;
    }

    // make real date 
    function realDate(CreatedDate){
        return CreatedDate.toLocaleString();
    }


// >>>>>> Delete Method 
    function deleteUser(id){
       let userId = id;

       fetch(`${url}/${userId}`,{method:'DELETE'})
       .then(res=>res.json())
       .then(()=>{
            users = users.filter(user => user.id != userId);
            createTable();
       })
    }




    
    // =========== modal =============

    const modal = slcEl('.modal-add-user');

    // show modal
    slcEl('#add-user').addEventListener('click',()=>{
        modal.style.display = 'flex';
    });

    // hide modal 
    modal.addEventListener('click',(e)=>{
        // check if clicked out modal-content
        if(e.target.classList.contains('modal-add-user')){
            modal.style.display = 'none';
        }
    });

    

// >>>>>>> Post method

    slcEl('.btn_addUser').addEventListener('click',(e)=>{
        e.preventDefault();

        let userData = {
            id: parseInt(users[users.length -1].id) + 1, //generate id 
            createdDate: slcEl('#date_creation').value,
            status: slcEl('#etat').value,
            firstName: slcEl('#prenom').value,
            lastName:  slcEl('#nom').value,
            userName:  slcEl('#nom_utilisateur').value,
            registrationNumber:  slcEl('#matricule').value
        }
        
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userData)
        })
        .then(res=>res.json())
        .then(data =>{
                // clone data & users
                users = [data,...users];
                // reload createTable
                createTable();
                // hide modal
                modal.style.display = 'none';  
        })

    })


 


       
        
