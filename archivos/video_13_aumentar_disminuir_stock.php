<!-- Modal para modificar el Stock-->
<div class="modal fade" id="mdlGestionarStock" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-gray py-2">
                <h6 class="modal-title" id="titulo_modal_stock">Adicionar Stock</h6>
                <button type="button" class="btn-close text-white fs-6" data-bs-dismiss="modal" aria-label="Close"
                    id="btnCerrarModalStock"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12 mb-3">
                        <label for="" class="form-label text-primary">Codigo: <span id="stock_codigoProducto"
                                class="text-secondary"></span></label>
                        <label for="" class="form-label text-primary">Producto: <span id="stock_Producto"
                                class="text-secondary"></span></label>
                        <label for="" class="form-label text-primary">Stock: <span id="stock_Stock"
                                class="text-secondary"></span></label>
                    </div>
                    <div class="col-12">
                        <div class="form-group mb-2">
                            <label class="" for="iptStockSumar">
                                <i class="fas fa-plus-circle fs-6"></i> <span class="small"
                                    id="titulo_modal_label">Agregar al Stock</span>
                            </label>
                            <input type="number" min="0" class="form-control form-control-sm" id="iptStockSumar"
                                placeholder="Ingrese cantidad a agregar al Stock">
                        </div>
                    </div>
                    <div class="col-12">
                        <label for="" class="form-label text-danger">Nuevo Stock: <span id="stock_NuevoStock"
                                class="text-secondary"></span></label><br>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal"
                    id="btnCancelarRegistroStock">Cancelar</button>
                <button type="button" class="btn btn-primary btn-sm" id="btnGuardarNuevorStock">Guardar</button>
            </div>
        </div>
    </div>

</div>
<!-- /. End Modal para modificar el Stock -->