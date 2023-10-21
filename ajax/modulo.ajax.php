<?php

require_once "../controladores/modulo.controlador.php";
require_once "../modelos/modulo.modelo.php";

class AjaxModulos{

    public function ajaxObtenerModulos(){

        $modulos = ModuloControlador::ctrObtenerModulos();

        echo json_encode($modulos);
    }

    public function ajaxObtenerModulosPorPerfil($id_perfil){

        $modulosPerfil = ModuloControlador::ctrObtenerModulosPorPerfil($id_perfil);

        echo json_encode($modulosPerfil);
    }

}


if(isset($_POST['accion']) && $_POST['accion'] == 1){ //
    $modulos = new AjaxModulos;
    $modulos->ajaxObtenerModulos();
}else if(isset($_POST['accion']) && $_POST['accion'] == 2){ //
    $modulosPerfil = new AjaxModulos();
    $modulosPerfil->ajaxObtenerModulosPorPerfil($_POST["id_perfil"]);
}