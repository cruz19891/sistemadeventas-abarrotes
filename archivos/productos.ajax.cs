/*===================================================================
LISTAR NOMBRE DE PRODUCTOS PARA INPUT DE AUTO COMPLETADO
====================================================================*/
public function ajaxListarNombreProductos(){

	$NombreProductos = ProductosControlador::ctrListarNombreProductos();

	echo json_encode($NombreProductos);
}

/*===================================================================
BUSCAR PRODUCTO POR SU CODIGO DE BARRAS
====================================================================*/
 public function ajaxGetDatosProducto(){
    
	$producto = ProductosControlador::ctrGetDatosProducto($this->codigo_producto);

	echo json_encode($producto);
}

/*=======================================================================================================*/
/*=======================================================================================================*/
/*=======================================================================================================*/

else if(isset($_POST["tipo_operacion"]) && $_POST["tipo_operacion"] == 6){ // OBTENER DATOS DE UN PRODUCTO POR SU CODIGO

    $nombreProductos = new AjaxProductos();
    $nombreProductos -> ajaxListarNombreProductos();

}else if(isset($_POST["accion"]) && $_POST["accion"] == 7){ // OBTENER DATOS DE UN PRODUCTO POR SU CODIGO

    $listaProducto = new AjaxProductos();
    $listaProducto -> codigo_producto = $_POST["codigo_producto"];
    
    $listaProducto -> ajaxGetDatosProducto();
	
}