import React, { useEffect, useState } from 'react'
import { baseD } from '../firebase'
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';

const Formulario = () => {
    //Variables
    const [nombreU, setNombreU] = useState('')
    const [apelldoU, setApellidoU] = useState('')
    const [modoEditar, setModoEditar] = useState(false)
    const [listaUsuario, setListaUsuario] = useState([])
    const [id, setId] = useState('')

    //metodo guardar
    const guardarDatos = async (e) => {
        e.preventDefault()
        try {
            const data = await addDoc(collection(baseD, 'persona'), {
                nombreUsuario: nombreU,
                apellidoUsuario: apelldoU
            })

            setListaUsuario([
                ...listaUsuario,
                { nombreUsuario: nombreU, apellidoUsuario: apelldoU, id: data.id }
            ])
            setNombreU('')
            setApellidoU('')

            if (!nombreU.trim() || /^\s+$/.test(nombreU)) {
                alert('Ingrese Nombre')

                return
            }
            if (!apelldoU.trim() || /^\s+$/.test(apelldoU)) {
                alert('Ingrese Apellido')
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const obtenerInformacion = async () => {
            try {
                await onSnapshot(collection(baseD, 'persona'), (query) => {
                    setListaUsuario(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                })
            } catch (error) {
                console.log(error)
            }
        }
        obtenerInformacion();
    }, [])

    const eliminar = async id => {
        try {
            await deleteDoc(doc(baseD, 'persona', id))
        } catch (error) {
            console.log(error)
        }

    }

    const activarEditar = item => {
        setNombreU(item.nombreU)
        setApellidoU(item.apellidoU)
        setId(item.id)
        setModoEditar(true)
    }

    const cancelarEditar = () => {
        setNombreU('')
        setApellidoU('')
        setId('')
        setModoEditar(false)
    }

    const editarU = async e => {
        e.preventDefault()
        try {
            const docRef = doc(baseD, 'persona', id)
            await updateDoc(docRef, {
                nombreUsuario: nombreU,
                apellidoUsuario: apelldoU
            })

            const arrayNuevo = listaUsuario.map(
                item => item.id === id ? { id: id, nombreUsuario: nombreU, apellidoUsuario: apelldoU } : item
            )

            setListaUsuario(arrayNuevo)
            setNombreU('')
            setApellidoU('')
            setId('')
            setModoEditar(false)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Formulario</h1>
            <hr />
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Lista Usuario</h4>
                    <ul className="list-group">
                        {
                            //lista de usuario
                            listaUsuario.map(item => (
                                <li className="list-group-item" key={item.id}>
                                    <span className="lead">{item.nombreUsuario} {item.apellidoUsuario}</span>
                                    <button className='btn btn-danger btn-sm float-end mx-2'
                                        onClick={() => eliminar(item.id)}>Eliminar</button>
                                    <button className="btn btn-warning btn-sm float-end"
                                        onClick={() => activarEditar(item)}>Editar</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-4">
                    <h4 className="text-center">
                        {
                            modoEditar ? 'Editar Usuario' : 'Añadier usuario'
                        }
                    </h4>
                    <form onSubmit={modoEditar? editarU : guardarDatos}>
                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese nombre'
                            value={nombreU}
                            onChange={(e) => setNombreU(e.target.value)}
                        />
                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese apelldo'
                            value={apelldoU}
                            onChange={(e) => setApellidoU(e.target.value)}
                        />
                        {
                            modoEditar ?
                                (
                                    <>
                                        <button className='btn btn-primary btn-block' type='submit'>Editar</button>
                                        <button className='btn btn-primary btn-block' type='submit'
                                            onClick={() => cancelarEditar()}>cancelar</button>
                                    </>
                                )
                                :
                                <button className='btn btn-primary btn-block' type='submit'>Añadir</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario