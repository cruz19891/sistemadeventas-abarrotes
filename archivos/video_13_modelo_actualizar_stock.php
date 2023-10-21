static public function actualizarDataPorTabla($table, $data, $id, $nameId){

	$set = "";

	foreach ($data as $key => $value) {
		
		$set .= $key." = :".$key.",";
			
	}

	$set = substr($set, 0, -1);

	$stmt = Conexion::conectar()->prepare("UPDATE $table SET $set WHERE $nameId = :$nameId");

	foreach ($data as $key => $value) {
		
		$stmt->bindParam(":".$key, $data[$key], PDO::PARAM_STR);
		
	}		

	$stmt->bindParam(":".$nameId, $id, PDO::PARAM_INT);

	if($stmt->execute()){

		return "Se realizó la actualización de forma exitosa";

	}else{

		return Connection::connect()->errorInfo();
	
	}

}