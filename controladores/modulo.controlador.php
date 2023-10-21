<?php

class ModuloControlador{

    static public function ctrObtenerModulos(){

        $modulos = ModuloModelo::mdlObtenerModulos();

        return $modulos;
    }

    static public function ctrObtenerModulosPorPerfil($id_perfil){

        $modulosPorPerfil = ModuloModelo::mdlObtenerModulosPorPerfil($id_perfil);

        return $modulosPorPerfil;

    }

}