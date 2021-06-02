LEEME!!!

Programación Web 2 - Trabajo Práctico - (Grupo 07) // Juan Baez - Juan Pablo Lausi - Gustavo Sasso

INSTITUTO UNIVERSITARIO PATAGÓNICO DE LAS ARTES
DIPLOMATURA EN PROGRAMACIÓN WEB

Programación Web 2 - Trabajo Práctico Integrador

Implementar una aplicación para llevar el control de una lista de tareas pendientes (TODOs). Cada tarea está compuesta por un título, una descripción y un estado (pendiente, completada o eliminada). La aplicación debería permitir crear y modificar tareas, cambiarlas de estado y listarlas, teniendo en cuenta las siguientes consideraciones:
- El título es obligatorio.
- La descripción es opcional.
- Sólo deben listarse las tareas que no están en estado eliminado.
- Las tareas deben crearse con estado pendiente, luego pueden pasar al estado completada o eliminada.
- Una tarea pendiente o completada puede eliminarse, pero una tarea eliminada no puede cambiar su estado.
- La aplicación debe contar con un mecanismo de autenticación, y cada usuario debería poder acceder únicamente a las tareas que él creó.
- No debe visualizarse la lista de tareas hasta que el usuario inicie sesión.
- No se deben poder realizar acciones hasta que el usuario esté logueado.
- Los usuarios se crearán en la Base de Datos directamente.
- Las entradas deberán contar con una fecha de creación y una fecha de edición.
- Debe ser posible editar un registro en estado pendiente únicamente.

La aplicación constará de un un frontend que se comunicará con una API REST, que a su vez hará uso de una base de datos MySQL para almacenar la información.

La entrega se hará mediante un repositorio GIT que deberá además contener un dump de la base de datos utilizada por la aplicación.

El trabajo debe ser realizado por un equipo de trabajo de no más de 3 personas. Todos deben trabajar en el mismo repositorio. La evaluación final incluirá revisión de Commits individuales de cada integrante en el equipo.

Entregas
Las entregas serán presentadas en el repositorio creado para el Equipo de Trabajo. Todo el trabajo debe encontrarse presente en el mismo al momento de la presentación.
1ra entrega
    - Definir equipo de trabajo. Definir responsabilidades de cada integrante.
    - Crear repositorio de trabajo. Todos los miembros deben tener acceso.
    - Maquetar base de datos.
2da entrega
    - Implementar base de datos.
        - Dump o Script de inicialización.
        - Implementar el modelo de datos propuesto.
        - Definir correctamente los tipos de datos.
        - Definir correctamente las tablas.
    - Implementar backend en NodeJS (no necesariamente debe funcionar ni validar todo, pero sí debe estar definido):
        - Endpoint para iniciar sesión (Login).
        - Endpoint para listar tareas.
        - Endpoint para eliminar tarea (no es un borrado físico, es un borrado lógico).
        - Endpoint para editar una tarea.
        - Endpoint para ver los detalles de una tarea.
        - Endpoint para crear una tarea.
    - Implementar frontend (no necesariamente debe funcionar todo):
        - Pantalla de login.
        - Lista de tareas. Botones de acciones.
        - Formulario para crear y/o editar una tarea.
        - Mostrar detalles de la tarea.

Entrega final
    - Implementar backend en NodeJS:
        - Las validaciones ya deben estar funcionando.
        - No se deben poder realizar acciones si no se ha iniciado sesión aún.
        - Solo debe actuar sobre las tareas del usuario logueado, no debe ser posible acceder o accionar por API sobre una tarea que no es del usuario logueado.
    - Implementar frontend:
        - Si el usuario no está logueado, debe mostrar únicamente el formulario.
        - Si el usuario está logueado, debe mostrar la lista de tareas.
        - Barra de acciones para cerrar sesión.
        - Se deben aplicar los conceptos de maquetado adquiridos.

Adicional

Adicionalmente, pueden incluir las siguientes funcionalidades:
    - Cambio de contraseña del usuario.
    - Encriptar la contraseña en la base de datos.
