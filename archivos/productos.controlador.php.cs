/*===================================================================
LISTAR NOMBRE DE PRODUCTOS PARA INPUT DE AUTO COMPLETADO
====================================================================*/
static public function ctrListarNombreProductos(){

	$producto = ProductosModelo::mdlListarNombreProductos();

	return $producto;
}

/*===================================================================
BUSCAR PRODUCTO POR SU CODIGO DE BARRAS
====================================================================*/
static public function ctrGetDatosProducto($codigo_producto){
        
	$producto = ProductosModelo::mdlGetDatosProducto($codigo_producto);

	return $producto;

}

