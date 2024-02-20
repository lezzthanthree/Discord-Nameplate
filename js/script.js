let inputId

let avatarInput = document.getElementById('avatar');
let coverInput = document.getElementById('cover');
const inputElements = document.querySelectorAll('input[type="text"], textarea[type="text"]');

avatarInput.onchange = (e) =>
{
    if (avatarInput.files[0])
    {
        let avatarImg = document.getElementById('avatar_div');
        avatarImg.src = URL.createObjectURL(avatarInput.files[0])
    }
}

coverInput.onchange = (e) =>
{
    if (coverInput.files[0])
    {
        let coverImg = document.getElementById('cover_div');
        coverImg.src = URL.createObjectURL(coverInput.files[0])
    }
}

inputElements.forEach(function(input) {
    input.addEventListener("click", function() {
        inputId = input.id;
    });
});

function updateDiv() {
    var input = document.getElementById(inputId);
    var outputDiv = document.getElementById(inputId + "_div");

    var text = input.value;

    if (text == "") {
        text = input.getAttribute("placeholder");
    }

    outputDiv.textContent = text;
}

function toggleSettings() {
    var div = document.getElementById("settings");
    if (div.style.display === "none") 
    {
        div.style.display = "block";
    } 
    else 
    {
        div.style.display = "none";
    }
}

function toggleRoleAdd() {
    var div = document.getElementById("inputcolor");
    if (div.style.display === "none") 
    {
        div.style.display = "flex";
    } 
    else 
    {
        div.style.display = "none";
    }
}

function getRoles() {
    document.getElementById("inputroles").innerHTML = "";
    var roleList = document.getElementById("listedroles");
    
    var roles = roleList.getElementsByClassName('role');
    
    return roles
}

function listRoles() {
    var roles = getRoles()

    var container = document.getElementById("inputroles");
    
    for (let i = 0; i < roles.length; i++)
    {
        var roleName = roles[i].getElementsByClassName('rolename')[0].innerHTML
        var roleColor = getComputedStyle(roles[i].getElementsByClassName('rolecolor')[0]).backgroundColor
        console.log(roleName + " " + roleColor);
        
        var roleShape = document.createElement('div')
        roleShape.className = "role roledeletable";
        roleShape.id = roleName.replace(/\s+/g, '') + "_role"
        roleShape.onclick = function()
        {
            removeRole(this.id)
        };
        container.appendChild(roleShape)
        
        createDiv(roleShape, "rolecolor", "", roleColor)
        createDiv(roleShape, "rolename", roleName, "rgba(0, 0, 0, 0)")
    }
}

function addRole()
{
    var inputName = document.getElementById("rolenameinput").value
    var inputColor = document.getElementById("rolecolorinput").value

    if (inputName == '')
    {
        showRoleError("Enter a role name!")
        return
    }

    var container = document.getElementById("listedroles");
    createRole(container, inputName, inputColor)

    listRoles()

    var divAdd = document.getElementById("inputcolor");
    divAdd.style.display = "none";

    document.getElementById("rolenameinput").value = ""
    document.getElementById("rolecolorinput").value = "rgb(0, 0, 0)"
}

function createRole(container, name, color)
{
    var roleDiv = createDiv(container, "role", "")
    var roleColor = createDiv(roleDiv, "rolecolor", "", color)
    var roleName = createDiv(roleDiv, "rolename", name, "rgba(0, 0, 0, 0)")

    roleDiv.id = "div_" + name.replace(/\s+/g, '') + "_role"
    
    updateRoles();
}

function removeRole(id)
{
    console.log(id)
    var role = document.getElementById('div_' + id);

    console.log(role.id)
    role.parentNode.removeChild(role)
    
    var setting_role = document.getElementById(id);
    setting_role.parentNode.removeChild(setting_role);

    updateRoles();
}

function updateRoles()
{
    var roles = getRoles()
    var div = document.getElementById("rolesection");
    if (roles.length <= 0)
    {
        div.style.display = 'none'
    }
    else
    {
        div.style.display = 'flex'
    }
}

function updateMemberDate(obj)
{
    var date = new Date(obj.value)

    var month = date.toLocaleString('en-US', { month: 'long' })
    var day = date.getDate()
    var year = date.getFullYear()

    console.log(date)

    var date_string = document.getElementById("member_div")
    date_string.textContent = `${month} ${day}, ${year}`
}

function createDiv(container, className, text, color)
{
    var newDiv = document.createElement('div')
    newDiv.className = className;
    newDiv.textContent = text;
    newDiv.style.backgroundColor = color

    container.appendChild(newDiv)

    return newDiv
}

function showRoleError(message)
{
    var div = document.getElementById("roleerror");
    div.style.display = 'block'

    div.innerHTML = message
}

listRoles()