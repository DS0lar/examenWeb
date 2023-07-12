from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import *
import os
from django.conf import settings
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth import login,logout, authenticate
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
import json
from django.contrib import messages
from django.core.serializers import serialize
from django.db.models import F
# Create your views here.


def cargarInicio(request):
    return render(request,"inicio.html")

def cargarNosotros(request):
    return render(request,"nosotros.html")

def cargarLogin(request):
    return render(request,"login.html")


#def cargarAgregarPro(request):
#    return render(request,"prod-agregar.html")

def cargarEditarPro(request):
    return render(request,"prod-editar.html")

def cargarPro(request):
    return render(request,"productos.html")

def cargarAccesorio(request):
    productos = Producto.objects.all()
    categoria_accesorios = Producto.objects.filter(id_categoria = 3)
    return render(request,"carrito-accesorios.html",{"productos": productos, "categoria_accesorios": categoria_accesorios})

def cargarComida(request):
    productos = Producto.objects.all()
    categoria_alimento = Producto.objects.filter(id_categoria = 1)
    return render(request,"carrito-comida.html", {"prod":productos,"cate_ali":categoria_alimento})

def cargarJuguete(request):
    productos = Producto.objects.all()
    categoria_juguetes = Producto.objects.filter(id_categoria = 2)
    return render(request,"carrito-juguetes.html", {"prod":productos,"cate_jugue":categoria_juguetes})

def cargarAccesorioNoUser(request):
    productos = Producto.objects.all()
    categoria_accesorios = Producto.objects.filter(id_categoria = 3)
    return render(request,"carrito-accesorios_noUser.html",{"productos": productos, "categoria_accesorios": categoria_accesorios})

def cargarComidaNoUser(request):
    productos = Producto.objects.all()
    categoria_alimento = Producto.objects.filter(id_categoria = 1)
    return render(request,"carrito-comida_noUser.html", {"prod":productos,"cate_ali":categoria_alimento})

def cargarJugueteNoUser(request):
    productos = Producto.objects.all()
    categoria_juguetes = Producto.objects.filter(id_categoria = 2)
    return render(request,"carrito-juguetes_noUser.html", {"prod":productos,"cate_jugue":categoria_juguetes})
    
def cargarAgregarProducto(request):
    categorias = Categoria.objects.all()
    productos = Producto.objects.all()
    tipo_animal = TipoAnimal.objects.all()
    return render(request,"prod-agregar.html",{"cate":categorias, "prod":productos, "tipoA":tipo_animal})

@login_required
def agregarProducto(request):
    

    v_sku = request.POST['sku']
    v_nombre = request.POST['nombre']
    v_precio = request.POST['precio']
    v_cantidad = request.POST['cantidad']
    v_proveedor = request.POST['proveedor']
    v_descripcion = request.POST['descripcion']
    v_img = request.FILES['imagen']
    v_categoria = Categoria.objects.get(id_categoria = request.POST['tipo'])
    v_tipoA= TipoAnimal.objects.get(id_tipoA = request.POST['tipoA'])

    Producto.objects.create(sku = v_sku,nombre = v_nombre,  precio = v_precio, cantidad = v_cantidad, proveedor = v_proveedor, descripcion = v_descripcion, id_categoria = v_categoria, id_tipoA = v_tipoA , imagen_url = v_img)        

    return redirect('/agregar')

def validar_sku(request):
    sku = request.GET.get('sku')
    existe_sku = Producto.objects.filter(sku=sku).exists()
    return JsonResponse({'existe_sku': existe_sku})


def cargarEditarProducto(request,sku):
    productos = Producto.objects.get(sku = sku)
    categorias = Categoria.objects.all()
    tipo_animal = TipoAnimal.objects.all()
    return render(request,"prod-editar.html",{"prod":productos,"cate":categorias, "tipoA":tipo_animal})

@login_required         
def editarProducto(request):
    v_sku = request.POST['sku']
    productoBD = Producto.objects.get(sku = v_sku)
    v_nombre = request.POST['nombre']
    v_precio = request.POST['precio']
    v_cantidad = request.POST['cantidad']
    v_proveedor = request.POST['proveedor']
    v_descripcion = request.POST['descripcion']
    v_categoria = Categoria.objects.get(id_categoria = request.POST['tipo'])
    v_tipoA= TipoAnimal.objects.get(id_tipoA = request.POST['tipoA'])
    

    try:
        v_img = request.FILES['imagen']
        ruta_imagen = os.path.join(settings.MEDIA_ROOT, str(productoBD.imagen_url))
        os.remove(ruta_imagen)
    except:
        v_img = productoBD.imagen_url


    productoBD.nombre = v_nombre
    productoBD.cantidad = v_cantidad
    productoBD.proveedor = v_proveedor
    productoBD.precio = v_precio
    productoBD.descripcion = v_descripcion
    productoBD.imagen_url = v_img
    productoBD.id_categoria = v_categoria
    productoBD.id_tipoA = v_tipoA

    productoBD.save()


    return redirect('/agregar')

@login_required
def eliminarProducto(request,sku):
    producto = Producto.objects.get(sku = sku)
    ruta_imagen = os.path.join(settings.MEDIA_ROOT, str(producto.imagen_url))
    os.remove(ruta_imagen)
    producto.delete()
    return redirect('/agregar')

def sign(request):
    if request.method == 'GET':
        return render(request, 'signUp.html', {"form": UserCreationForm})
    else:
        username = request.POST.get("username")
        password1 = request.POST.get("password1")
        password2 = request.POST.get("password2")

        if not (username and password1 and password2):
            return render(request, 'signUp.html', {"form": UserCreationForm, "error": "Por favor, completa todos los campos."})

        if password1 == password2:
            try:
                user = User.objects.create_user(username, password=password1)
                user.save()
                login(request, user)
                return redirect('/signin')
            except IntegrityError:
                return render(request, 'signUp.html', {"form": UserCreationForm, "error": "Usuario ya existe."})
        else:
            return render(request, 'signUp.html', {"form": UserCreationForm, "error": "Las contraseñas no coinciden."})


@login_required
def signout(request):
    logout(request)
    return redirect('/')


def signin(request):
    if request.method == 'GET':
        return render(request, 'signIn.html', {"form": AuthenticationForm})
    else:
        user = authenticate(
            request, username=request.POST['username'], password=request.POST['password1'])
        if user is None:
            return render(request, 'signIn.html', {"form": AuthenticationForm, "error": "Usuario o contraseña incorrecto."})

        login(request, user)
        return redirect('/')



def ver_video_youtube(request):
    return render(request, 'ver_video.html', 'nosotros.html')


def actualizarStock(request):
    if request.method == 'POST':
        carrito = request.POST.get('carrito')
        carrito = json.loads(carrito)

        # Obtener una lista de los SKU de los productos en el carrito
        skus = [item['sku'] for item in carrito]

        # Actualizar el stock utilizando el método update()
        Producto.objects.filter(sku__in=skus).update(cantidad=F('cantidad') - 1)

        return JsonResponse({'success': True})