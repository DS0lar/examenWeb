from django.urls import path
from . import views 


urlpatterns = [
    path('',views.cargarInicio),
    path('nosotros',views.cargarNosotros),
    path('login',views.cargarLogin),
    path('agregar',views.cargarAgregarProducto),
    path('editar',views.cargarEditarPro),
    path('productos',views.cargarPro),
    path('accesorios',views.cargarAccesorio),
    path('alimento',views.cargarComida),
    path('juguetes',views.cargarJuguete),
    path('acc',views.cargarAccesorioNoUser),
    path('ali',views.cargarComidaNoUser),
    path('jug',views.cargarJugueteNoUser),
    path('agregarProductoForm',views.agregarProducto),
    path('validar_sku/', views.validar_sku, name='validar_sku'),
    path('editar/<sku>',views.cargarEditarProducto),
    path('editarProductoForm',views.editarProducto),
    path('eliminar/<sku>',views.eliminarProducto),
    path('signup/', views.sign),
    path('logout/',  views.signout),
    path('signin/', views.signin), 
    path('video/', views.ver_video_youtube, name='ver_video'),
    path('actualizar_stock/', views.actualizarStock)
   
]