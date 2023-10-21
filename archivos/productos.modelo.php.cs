/*===================================================================
LISTAR NOMBRE DE PRODUCTOS PARA INPUT DE AUTO COMPLETADO
====================================================================*/
static public function mdlListarNombreProductos(){

	$stmt = Conexion::conectar()->prepare("SELECT Concat(codigo_producto , ' - ' ,c.nombre_categoria,' - ',descripcion_producto, ' - S./ ' , p.precio_venta_producto)  as descripcion_producto
											FROM productos p inner join categorias c on p.id_categoria_producto = c.id_categoria");

	$stmt -> execute();

	return $stmt->fetchAll();
}

/*===================================================================
BUSCAR PRODUCTO POR SU CODIGO DE BARRAS
====================================================================*/
static public function mdlGetDatosProducto($codigoProducto){

	$stmt = Conexion::conectar()->prepare("SELECT   id,
													codigo_producto,
													c.id_categoria,                                                        
													c.nombre_categoria,
													descripcion_producto,
													'1' as cantidad,
													CONCAT('S./ ',CONVERT(ROUND(precio_venta_producto,2), CHAR)) as precio_venta_producto,
													CONCAT('S./ ',CONVERT(ROUND(1*precio_venta_producto,2), CHAR)) as total,
													'' as acciones,
													c.aplica_peso
											FROM productos p inner join categorias c on p.id_categoria_producto = c.id_categoria
										   WHERE codigo_producto = :codigoProducto
											AND p.stock_producto > 0");
	
	$stmt -> bindParam(":codigoProducto",$codigoProducto,PDO::PARAM_INT);

	$stmt -> execute();

	return $stmt->fetch(PDO::FETCH_OBJ);
}
