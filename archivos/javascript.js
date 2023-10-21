<script>

	var items = []; // SE USA PARA EL INPUT DE AUTOCOMPLETE
	var table;
    var itemProducto = 1;	
	
    $(document).ready(function(){

        /* ======================================================================================
        INICIALIZAR LA TABLA DE VENTAS
        ======================================================================================*/
        table = $('#lstProductosVenta').DataTable({
            columnDefs: [{
                    targets: 0,
                    visible: false
                },
                {
                    targets: 3,
                    visible: false
                },
                {
                    targets: 2,
                    visible: false
                },
                {
                    targets: 6,
                    orderable: false
                },
                {
                    targets: 9,
                    visible: false
                }
            ],
            "order": [
                [0, 'desc']
            ],
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
            }
        });
		
		/* ======================================================================================
		TRAER LISTADO DE PRODUCTOS PARA INPUT DE AUTOCOMPLETADO
		======================================================================================*/
		$.ajax({
			async: false,
			url: "ajax/productos.ajax.php",
			method: "POST",
			data: {
				'accion': 6
			},
			dataType: 'json',
			success: function(respuesta) {

				for (let i = 0; i < respuesta.length; i++) {
					items.push(respuesta[i]['descripcion_producto'])
				}
				$("#iptCodigoVenta").autocomplete({
					source: items,
					select: function(event, ui) {

						CargarProductos(ui.item.value);                                    
						
						$("#iptCodigoVenta").val("");

						$("#iptCodigoVenta").focus();

						return false;
					}
				})


			}
		});
		
		 /* ======================================================================================
		EVENTO PARA INICIAR EL REGISTRO DE LA VENTA
		======================================================================================*/
		$("#btnIniciarVenta").on('click', function() {

			var count = 0;
			var totalVenta = $("#totalVenta").html();

			table.rows().eq(0).each(function(index) {
				count = count + 1;
			});

			if (count > 0) {

				if ($("#iptEfectivoRecibido").val() > 0 && $("#iptEfectivoRecibido").val() != "") {

					if ($("#iptEfectivoRecibido").val() < parseFloat(totalVenta)) {
						Toast.fire({
							icon: 'warning',
							title: 'El efectivo es menor al costo total de la venta'
						});

						return false;
					}

					var formData = new FormData();
					var arr = [];

					table.rows().eq(0).each(function(index) {
	
						var row = table.row(index);

						var data = row.data();

						arr[index] = data[1] + "," + parseFloat(data[5]) + "," + data[7].replace("S./ ", "");
						formData.append('arr[]', arr[index]);

					})

					formData.append('nro_boleta', nro_boleta);
					formData.append('descripcion_venta', 'Venta realizada con Nro Boleta: ' + nro_boleta);
					formData.append('total_venta', parseFloat(totalVenta));

					$.ajax({
						url: "ajax/ventas.ajax.php",
						method: "POST",
						data: formData,
						cache: false,
						contentType: false,
						processData: false,
						success: function(respuesta) {

							Swal.fire({
								position: 'center',
								icon: 'success',
								title: respuesta,
								showConfirmButton: false,
								timer: 1500
							})

							$("#mdlRegistrarVenta").modal('hide');

							table
								.clear()
								.draw();

							$("#totalVenta").html("0.00");
							$("#totalVentaRegistrar").html("0.00");
							$("#boleta_total").html("0.00");
							$("#boleta_igv").html("0.00");
							$("#boleta_subtotal").html("0.00");                        
							$("#iptEfectivoRecibido").val("");
							$("#EfectivoEntregado").html("0.00");
							$("#Vuelto").html("0.00");
							$("#chkEfectivoExacto").prop('checked', false);
							
							$("#iptCodigoVenta").focus();
							CargarNroBoleta();
						}
					});


				} else {
					Toast.fire({
						icon: 'error',
						title: 'Ingrese el monto en efectivo'
					});
				}

			} else {

				Toast.fire({
					icon: 'error',
					title: 'No hay productos en el listado.'
				});


				// Swal.fire({
				//     title: 'Error!',
				//     text: 'No hay productos en el listado.',
				//     icon: 'error',
				//     confirmButtonText: 'Ok'
				// })


				$("#iptCodigoVenta").focus();
			}

			$("#iptCodigoVenta").focus();

		})

    });
	
	/*===================================================================*/
    //FUNCION PARA CARGAR PRODUCTOS EN EL DATATABLE
    /*===================================================================*/
    function CargarProductos(producto = "") {

        if (producto != "") {
            var codigo_producto = producto;
        } else {
            var codigo_producto = $("#iptCodigoVenta").val();
        }

        $.ajax({
			url: "ajax/productos.ajax.php",
			method: "POST",
			data: {
				'accion': 7, //BUSCAR PRODUCTOS POR SU CODIGO DE BARRAS
				'codigo_producto': codigo_producto
			},
			dataType: 'json',
			success: function(respuesta) {
				
				/*===================================================================*/
				//SI LA RESPUESTA ES VERDADERO, TRAE ALGUN DATO
				/*===================================================================*/
				if (respuesta) {

					var TotalVenta = 0.00;

					if (respuesta['aplica_peso'] == 1) {

						table.row.add([
							itemProducto,
							respuesta['codigo_producto'],
							respuesta['id_categoria'],
							respuesta['nombre_categoria'],
							respuesta['descripcion_producto'],
							respuesta['cantidad'] + ' Kg(s)',
							respuesta['precio_venta_producto'],
							respuesta['total'],
							"<center>" +
							"<span class='btnIngresarPeso text-success px-1' style='cursor:pointer;' data-bs-toggle='tooltip' data-bs-placement='top' title='Aumentar Stock'> " +
							"<i class='fas fa-balance-scale fs-5'></i> " +
							"</span> " +
							"<span class='btnEliminarproducto text-danger px-1'style='cursor:pointer;' data-bs-toggle='tooltip' data-bs-placement='top' title='Eliminar producto'> " +
							"<i class='fas fa-trash fs-5'> </i> " +
							"</span>" +
							"</center>",
							respuesta['aplica_peso']
						]).draw();

						itemProducto = itemProducto + 1;

					} else {

						table.row.add([
							itemProducto,
							respuesta['codigo_producto'],
							respuesta['id_categoria'],
							respuesta['nombre_categoria'],
							respuesta['descripcion_producto'],
							respuesta['cantidad'] + ' Und(s)',
							respuesta['precio_venta_producto'],
							respuesta['total'],
							"<center>" +
							"<span class='btnAumentarCantidad text-success px-1' style='cursor:pointer;' data-bs-toggle='tooltip' data-bs-placement='top' title='Aumentar Stock'> " +
							"<i class='fas fa-cart-plus fs-5'></i> " +
							"</span> " +
							"<span class='btnDisminuirCantidad text-warning px-1' style='cursor:pointer;' data-bs-toggle='tooltip' data-bs-placement='top' title='Disminuir Stock'> " +
							"<i class='fas fa-cart-arrow-down fs-5'></i> " +
							"</span> " +
							"<span class='btnEliminarproducto text-danger px-1'style='cursor:pointer;' data-bs-toggle='tooltip' data-bs-placement='top' title='Eliminar producto'> " +
							"<i class='fas fa-trash fs-5'> </i> " +
							"</span>" +
							"</center>",
							respuesta['aplica_peso']
						]).draw();

						itemProducto = itemProducto + 1;

					}


					//  Recalculamos el total de la venta
					table.rows().eq(0).each(function(index) {
						var row = table.row(index);

						var data = row.data();
						TotalVenta = parseFloat(TotalVenta) + parseFloat(data[7].replace("S./ ", ""));

					});

					$("#totalVenta").html("");
					$("#totalVenta").html(TotalVenta.toFixed(2));                                                    

					$("#iptCodigoVenta").val("");

					var igv = parseFloat(TotalVenta) * 0.18;
					var subtotal = parseFloat(TotalVenta) - parseFloat(igv);

					$("#boleta_subtotal").html(parseFloat(subtotal).toFixed(2));
					$("#boleta_igv").html(parseFloat(igv).toFixed(2));
					$("#boleta_total").html(parseFloat(TotalVenta).toFixed(2));

					$("#totalVentaRegistrar").html(TotalVenta);
					$("#boleta_total").html(TotalVenta);
					actualizarVuelto();

				/*===================================================================*/
				//SI LA RESPUESTA ES FALSO, NO TRAE ALGUN DATO
				/*===================================================================*/
				} else {
					
					Toast.fire({
						icon: 'error',
						title: ' El producto no existe o no tiene stock'
					});

					$("#iptCodigoVenta").val("");
					$("#iptCodigoVenta").focus();

				}

			}
		});      

    }/* FIN CargarProductos */

</script>