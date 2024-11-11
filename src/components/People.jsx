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
                                />
                            </div>
                        );
                    })
                }
            </div>
        </div>
        {/* Se crea el formulario  */}
        <div className="container">
            <h2 className="text-center mt-4">Crear Nuevo Empleado</h2>
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
                    <button type="submit" className="btn btn-primary">Modificar</button>
                </div>
            </form>
        </div>
    </div>
  )
};

People.propTypes = {
    people: PropTypes.array,
    setPeople: PropTypes.func
}
