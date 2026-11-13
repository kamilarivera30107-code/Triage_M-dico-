document.addEventListener("DOMContentLoaded", mostrarPacientes);

document.getElementById("btnRegistrar").addEventListener("click", function() {
    let nombre = document.getElementById("nombreP").value;
    let oxigenoVal = document.getElementById("oxigenoP").value;
    let ritmoVal = document.getElementById("ritmoP").value;

    if (nombre === "" || oxigenoVal === "" || ritmoVal === "") {
        alert("Llena todos los campos por favor");
        return;
    }

    let oxigeno = Number(oxigenoVal);
    let ritmo = Number(ritmoVal);

    let nivel = "";
    let claseCSS = "";

    if (oxigeno < 90 || ritmo > 130) {
        nivel = "Rojo (Crítico)";
        claseCSS = "table-danger";
    } else if (oxigeno >= 90 && oxigeno <= 94) {
        nivel = "Amarillo (Urgente)";
        claseCSS = "table-warning";
    } else {
        nivel = "Verde (Estable)";
        claseCSS = "table-success";
    }

    let paciente = {
        nombre: nombre,
        oxigeno: oxigeno,
        ritmo: ritmo,
        nivel: nivel,
        claseCSS: claseCSS
    };

    let lista = JSON.parse(localStorage.getItem("pacientes")) || [];
    lista.push(paciente);
    localStorage.setItem("pacientes", JSON.stringify(lista));

    document.getElementById("nombreP").value = "";
    document.getElementById("oxigenoP").value = "";
    document.getElementById("ritmoP").value = "";

    mostrarPacientes();
});

function mostrarPacientes() {
    let tbody = document.getElementById("listaPacientes");
    tbody.innerHTML = "";

    let lista = JSON.parse(localStorage.getItem("pacientes")) || [];

    for (let i = 0; i < lista.length; i++) {
        let p = lista[i];
        
        let fila = document.createElement("tr");
        fila.className = p.claseCSS;

        fila.innerHTML = `
            <td>${p.nombre}</td>
            <td>${p.oxigeno}%</td>
            <td>${p.ritmo} lpm</td>
            <td><strong>${p.nivel}</strong></td>
        `;

        tbody.appendChild(fila);
    }
}
