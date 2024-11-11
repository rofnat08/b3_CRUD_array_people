import PropTypes from "prop-types";
import { Person } from "./Person";
import { useState } from "react";
export const People = ({people, setPeople}) => {
  // Estado para gestionar el ID de la persona que se està editando
  const [editingId, setEditingId] = useState(null);

  // Variable de estado para saber si la persona està editando o no
  const [isEditing, setIsEditing] = useState(false); //Para dar el nombre de una variable booleana es con is al inicio para react jsx

  //Estado para almacenar temporalmente esos datos de la persona que se està editando (arreglo people)
  const [editedPerson, setEditedPerson] = useState(
    //solo se edita name role e img
    {
        name: '',
        role: '',
        img: ''
    }
  );

  //Estado para eliminar la persona del array
  const [personToDelete, setPersonToDelete] = useState (null);


  //Metodo para gestionar los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPerson(prevState => ({
        //deja los valores actuales y espera hasta que edite
        ...prevState,
        [name]: value
    }));
  };

  // metodo para crear una nueva persona en el team
  const handleCreate = (e) => {
    e.preventDefault();// previene que se recarge el navegador y se pierdan losdatos que no se han guardado
    //agregar una persona al array ...people deja los datos taly como està
    setPeople([...people, {id: people.length + 1, ...editedPerson}]);
    // reiniciar el estado del formulario
    setEditedPerson({name: '', role: '', img: ''}) //Se limpian los campos del formulario
  };

  //Metodo para editar a una persona (Se estable el id de la persona que se va a editar)
  const handleEdit = (id) => {
    setEditingId(id);
    setIsEditing(true); //cuando la persona hace click en editar se cambia el estado de la variable que se llama setIsEditing a true 
    const personToEdit = people.find(person => person.id === id); //coincidencia exacta mismo valor y tipo de dato
    
    setEditedPerson({...personToEdit});
  };

  //Metodo para guardar los cambios despuès de editar a una persona

  const handleSave = (e) => {
    //Prevenir recarga automatica del navegador
    e.preventDefault();
    //recorre el arreglo y si encuentra la persona lo guarda en updatePeople y sino la guarda en editedPerson (devulve el objeto)
    const updatePeople = people.map(person => person.id === editingId ? editedPerson : person)
    
    //Actualizar el estado de personas con el array actualizado
    setPeople(updatePeople);

    setIsEditing(false);
    setEditingId(null);
    setEditedPerson({
        name: '',
        role: '',
        img: ''
    });

  };

  //Metodos para eliminar una persona del array

  //Metodo #1: guarda el id de la persona a eliminar

  const handleDelete = (id) => {
    setPersonToDelete(id);
  };

  //Metodo #2: Confirmar la eliminaciòn
  const confirmDelete = () => {
    // Filtra el array de personas, eliminando la persona que coincide con el id
    setPeople(people.filter(person => person.id !== personToDelete ));
    setPersonToDelete(null);
  };
  //Metodo #3: Confirmar la eliminaciòn con un modal
  const cancelDelete = () => {
    setPersonToDelete(null);
  };




  return (
    <div>
        <h2 className="text-center my-4">IT Team</h2>
        <div className="container">
            <div className="row d-flex flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3">
                {
                    people.map((people) => {
                        return (
                            <div key={people.id}>
                                <Person
                                    id={people.id}
                                    name={people.name}
                                    img={people.img}
                                    role={people.role}
                                    handleEdit={() => handleEdit(people.id)}
                                    handleDelete={handleDelete}
                                    // handleDelete={() => handleDelete(people.id)}
                                    
                                />
                            </div>
                        );
                    })
                }
            </div>
        </div>
        {/* Se crea el formulario  */}
        <div className="container">
            <h2 className="text-center mt-4">{isEditing ? 'Actualizar Empleado':'Crear Nuevo Empleado'}</h2>
            <form action="">
                <div>
                    <label htmlFor="name">Nombres</label>
                    {/* input por convencion debe tener un name y opcional un valor por defecto  */}
                    <input type="text" name="name" value={editedPerson.name} onChange={handleChange} required className="form-control"/>
                </div>
                <div>
                    <label htmlFor="role">Rol</label>
                    {/* input por convencion debe tener un name y opcional un valor por defecto  */}
                    <input type="text" name="role" value={editedPerson.role} onChange={handleChange} required className="form-control"/>
                </div>
                <div>
                    <label htmlFor="img">Avatar</label>
                    {/* input por convencion debe tener un name y opcional un valor por defecto  */}
                    <input type="text" name="img" value={editedPerson.img} onChange={handleChange} required className="form-control"/>
                </div>
                <div className="mt-2 text-center">
                    <button type="submit" className="btn btn-primary" onClick={isEditing? handleSave:handleCreate}>{isEditing? 'Actualizar':'Crear'}</button>
                </div>
            </form>
        </div>
        {/* Modal de confirmaciòn para eliminar */}
        <div id="deleteModal" className="modal fade" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Confirmar Eliminaciòn</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={cancelDelete}></button>
                    </div>
                    <div className="modal-body">
                        {/* ?.name}? Se agrega ? antes cuando el valor puede ser indefinido y no quiero que salga error */}
                        <p>¿Estas seguro de eliminar a {people.find(person => person.id === personToDelete)?.name}?</p> 
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={cancelDelete}>Cancelar</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={confirmDelete}>Eliminar</button>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

People.propTypes = {
    people: PropTypes.array,
    setPeople: PropTypes.func
}
