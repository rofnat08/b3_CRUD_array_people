import PropTypes from "prop-types";
import { Person } from "./Person";
import { useState } from "react";
export const People = ({people, setPeople}) => {
  // Estado para gestionar el ID de la persona que se està editando
  const [editingId, setEditingId] = useState(null);
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
                                />
                            </div>
                        );
                    })
                }
            </div>
        </div>
        {/* Se crea el formulario  */}
        <div className="container mt-4 row p-2">
            <h2 className="text-center">Crear Nuevo Empleado</h2>
            <form action="">
                <div>
                    <label htmlFor="name">Nombres</label>
                    {/* input por convencion debe tener un name y opcional un valor por defecto  */}
                    <input type="text" name="name" value={editedPerson.name} required className="form-control"/>
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
