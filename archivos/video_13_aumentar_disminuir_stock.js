
var operacion_stock = 0; // permitar definir si vamos a sumar o restar al stock (1: sumar, 2:restar)

/* ======================================================================================
EVENTO QUE LIMPIA EL INPUT DE INGRESO DE STOCK AL CERRAR LA VENTANA MODAL
=========================================================================================*/
$("#btnCancelarRegistroStock, #btnCerrarModalStock").on('click', function() {
	$("#iptStockSumar").val("")
})

/* ======================================================================================
EVENTO AL DAR CLICK EN EL BOTON AUMENTAR STOCK
=========================================================================================*/
$('#lstProductos tbody').on('click', '.btnAumentarStock', function() {

	operacion_stock = 1; //sumar stock
	$("#mdlGestionarStock").modal('show'); //MOSTRAR VENTANA MODAL
	$("#titulo_modal_stock").html('Aumentar Stock'); // CAMBIAR EL TITULO DE LA VENTANA MODAL
	$("#titulo_modal_label").html('Agregar al Stock'); // CAMBIAR EL TEXTO DEL LABEL DEL INPUT PARA INGRESO DE STOCK
	$("#iptStockSumar").attr("placeholder", "Ingrese cantidad a agregar al Stock"); //CAMBIAR EL PLACEHOLDER 
	
	var data = table.row($(this).parents('tr')).data(); //OBTENER EL ARRAY CON LOS DATOS DE CADA COLUMNA DEL DATATABLE

	$("#stock_codigoProducto").html(data[2])	//CODIGO DEL PRODUCTO DEL DATATABLE
	$("#stock_Producto").html(data[5]) 			//NOMBRE DEL PRODUCTO DEL DATATABLE
	$("#stock_Stock").html(data[9])				//STOCK ACTUAL DEL PRODUCTO DEL DATATABLE

	$("#stock_NuevoStock").html(parseFloat($("#stock_Stock").html()));

})

/* ======================================================================================
EVENTO AL DAR CLICK EN EL BOTON DISMINUIR STOCK
=========================================================================================*/
$('#lstProductos tbody').on('click', '.btnDisminuirStock', function() {

	operacion_stock = 2; //restar stock
	$("#mdlGestionarStock").modal('show'); //MOSTRAR VENTANA MODAL
	$("#titulo_modal_stock").html('Disminuir Stock'); // CAMBIAR EL TITULO DE LA VENTANA MODAL
	$("#titulo_modal_label").html('Disminuir al Stock'); // CAMBIAR EL TEXTO DEL LABEL DEL INPUT PARA INGRESO DE STOCK
	$("#iptStockSumar").attr("placeholder", "Ingrese cantidad a disminuir al Stock"); //CAMBIAR EL PLACEHOLDER 


	var data = table.row($(this).parents('tr')).data(); //OBTENER EL ARRAY CON LOS DATOS DE CADA COLUMNA DEL DATATABLE

	$("#stock_codigoProducto").html(data[2])	//CODIGO DEL PRODUCTO DEL DATATABLE
	$("#stock_Producto").html(data[4])			//NOMBRE DEL PRODUCTO DEL DATATABLE
	$("#stock_Stock").html(data[9])				//STOCK ACTUAL DEL PRODUCTO DEL DATATABLE

	$("#stock_NuevoStock").html(parseFloat($("#stock_Stock").html()));

})

/* ======================================================================================
EVENTO AL DIGITAR LA CANTIDAD A AUMENTAR O DISMINUIR DEL STOCK
=========================================================================================*/
$("#iptStockSumar").keyup(function() {

	// console.log($("#iptStockSumar").val());

	if (operacion_stock == 1) {

		if ($("#iptStockSumar").val() != "" && $("#iptStockSumar").val() > 0) {

			var stockActual = parseFloat($("#stock_Stock").html());
			var cantidadAgregar = parseFloat($("#iptStockSumar").val());

			$("#stock_NuevoStock").html(stockActual + cantidadAgregar);

		} else {

			Toast.fire({
				icon: 'warning',
				title: 'Ingrese un valor mayor a 0'
			});
			$("#iptStockSumar").val("")
			$("#stock_NuevoStock").html(parseFloat($("#stock_Stock").html()));

		}

	} else {

		if ($("#iptStockSumar").val() != "" && $("#iptStockSumar").val() > 0) {

			var stockActual = parseFloat($("#stock_Stock").html());
			var cantidadAgregar = parseFloat($("#iptStockSumar").val());

			$("#stock_NuevoStock").html(stockActual - cantidadAgregar);

			if (parseInt($("#stock_NuevoStock").html()) < 0) {

				Toast.fire({
					icon: 'warning',
					title: 'La cantidad a disminuir no puede ser mayor al stock actual (Nuevo stock < 0)'
				});

				$("#iptStockSumar").val("");
				$("#iptStockSumar").focus();
				$("#stock_NuevoStock").html(parseFloat($("#stock_Stock").html()));
			}
		} else {
			
			Toast.fire({
				icon: 'warning',
				title: 'Ingrese un valor mayor a 0'
			});
			
			$("#iptStockSumar").val("")
			
			$("#stock_NuevoStock").html(parseFloat($("#stock_Stock").html()));
		}
	}

})

/* ======================================================================================
EVENTO QUE REGISTRA EN BD EL AUMENTO O DISMINUCION DE STOCK
=========================================================================================*/
$("#btnGuardarNuevorStock").on('click', function() {

	if ($("#iptStockSumar").val() != "" && $("#iptStockSumar").val() > 0) {

		var nuevoStock = parseFloat($("#stock_NuevoStock").html()),
			codigo_producto = $("#stock_codigoProducto").html();

		var datos = new FormData();
		datos.append('tipo_operacion', 4);
		datos.append('nuevoStock', nuevoStock);
		datos.append('codigo_producto', codigo_producto);

		$.ajax({
			url: "ajax/productos.ajax.php",
			method: "POST",
			data: datos,
			processData: false,
			contentType: false,
			dataType: 'json',
			success: function(respuesta) {

				$("#stock_NuevoStock").html("");
				$("#iptStockSumar").val("");

				$("#mdlGestionarStock").modal('hide');
				table.ajax.reload();

				Swal.fire({
					position: 'center',
					icon: 'success',
					title: respuesta,
					showConfirmButton: false,
					timer: 1500
				})

			}
		});

	} else {
		Toast.fire({
			icon: 'warning',
			title: 'Debe ingresar la cantidad a aumentar'
		});
	}


})