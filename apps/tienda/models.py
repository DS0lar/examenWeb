from django.db import models

# Create your models here.
class TipoAnimal(models.Model):
    id_tipoA = models.IntegerField(primary_key=True)
    nombre_tipoA = models.CharField(max_length=100)

    def __str__(self):
        txt = "{0}"
        return txt.format(self.nombre_tipoA)

    

class Categoria(models.Model):
    id_categoria = models.IntegerField(primary_key=True)
    nombre_categoria = models.CharField(max_length=100)

    def __str__(self):
        txt = "ID:{0}  -  {1}"
        return txt.format(self.id_categoria, self.nombre_categoria)

class Producto(models.Model):
    sku = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=50)
    precio = models.IntegerField()
    cantidad = models.IntegerField()
    id_categoria = models.ForeignKey(Categoria,on_delete=models.CASCADE)
    id_tipoA = models.ForeignKey(TipoAnimal, on_delete=models.CASCADE)
    proveedor = models.CharField(max_length=100) 
    descripcion = models.CharField(max_length=200)
    imagen_url = models.ImageField(upload_to='imagenesProducto')
    
    
    def __str__(self):
        txt = "N° {0} - Stock: {1} - nombre: {2}"
        return txt.format(self.sku,self.cantidad, self.nombre)
    
