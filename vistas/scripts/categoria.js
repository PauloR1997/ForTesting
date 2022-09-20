var tabla;

// funcion que se ejecuta al inicio
function init(){
	mostrarform(false);
	listar();

	$("#formulario").on("submit", function(e){
		guardaryeditar(e);
	})
}
//funcion limpiar
function limpiar()
{
	$("#nombre").val("");
	$("#descripcion").val("");
	$("#idcategoria").val("");
}
//funcion mostrar formulario
function mostrarform(flag){
	limpiar();
	if(flag)
	{
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled",false);
		$("#btnagregar").hide();
	}
	else
	{
		$("#listadoregistros").show();
		$("#formularioregistros").hide();
		$("#btnagregar").show();	
	}	
}

// Funcion cancelarForm
function cancelarform(){
	limpiar();
	mostrarform(false);
}
//Funcion Listar
function listar()
{
	tabla = $('#tblistado').dataTable({
		"aProcessing": true, //Activamos el procesamiento del datatables
		"aServerSide": true, // Paginación y filtrado realizados por el servidor
		dom: 'Bfrtip',//Definimos los elementos del control de tabla
		buttons:[
					'copyHtml5',
					'excelHtml5',
					'csvHtml5',
					'pdf'
				],
		"ajax":
				{
					url:'../ajax/categoria.php?op=listar',
					type: "get",
					dataType: 'json',
					error: function(e){
						console.log(e.responseText);
					}
				},
		"bDestroy": true,
		"iDisplayLength": 5, //paginación
		"order" : [[0,"desc"]] // Ordenar (columna,orden)
	}).DataTable();
}
// funcion para guardar y editar
function guardaryeditar(e)
{
	e.preventDefault();//No se activará la acción predeterminada
	$("#btnGuardar").prop("disabled",true);
	var formData =  new FormData($("#formulario")[0]);

	$.ajax({
		url: "../ajax/categoria.php?op=guardaryeditar",
		type: "POST",
		data: formData,
		contentType: false,
		processData: false,

		success: function(datos)
		{
			bootbox.alert(datos);
			mostrarform(false);
			tabla.ajax.reload();
		}

	});
	limpiar();
}

function mostrar(idcategoria)
{
	$.post("../ajax/categoria.php?op=mostrar",{idcategoria: idcategoria}, function(data,status)
	{
		data = JSON.parse(data);
		mostrarform(true);

		$("#nombre").val(data.nombre);
		$("#descripcion").val(data.descripcion);
		$("#idcategoria").val(data.idcategoria);
	})
}

// Funcion para desactivar registros
function desactivar(idcategoria)
{
	bootbox.confirm("¿Está Seguro de desactivar la Categoria?",function(result){
		if(result)
		{
			$.post("../ajax/categoria.php?op=desactivar",{idcategoria: idcategoria}, function(e){
				bootbox.alert(e);
				tabla.ajax.reload();
			});
		}
	})
}
// Funcion para activar registros
function activar(idcategoria)
{
	bootbox.confirm("¿Está Seguro de activar la Categoria?",function(result){
		if(result)
		{
			$.post("../ajax/categoria.php?op=activar",{idcategoria: idcategoria}, function(e){
				bootbox.alert(e);
				tabla.ajax.reload();
			});
		}
	})
}

init();