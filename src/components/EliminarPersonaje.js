import React, { useState, useEffect } from 'react';
import { deletePersonaje, getAllPersonajes } from '../api';

function EliminarPersonaje() {
    const [idEliminar, setIdEliminar] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState(null);
    const [personajes, setPersonajes] = useState([]);

    useEffect(() => {
        getAllPersonajes()
            .then(data => setPersonajes(data))
            .catch(err => setError(err.message));
    }, []);

    const handleChange = (e) => {
        setIdEliminar(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await deletePersonaje(idEliminar);
            setMensaje(response.message);
            setError(null);
            setIdEliminar('');
            getAllPersonajes().then(data => setPersonajes(data));
        } catch (error) {
            setError(error.message);
            setMensaje('');
        }
    };

    return (
        <div>
            <h2>Eliminar Personaje</h2>
            <h3>Lista de Personajes</h3>
            {personajes.length > 0 ? (
                <ul>
                    {personajes.map(p => (
                        <li key={p.id}>ID: {p.id}, Nombre: {p.name}, Whatsapp: {p.whatsapp}</li>
                    ))}
                </ul>
            ) : (
                <p>No hay personajes.</p>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID del Personaje a Eliminar:</label>
                    <input type="number" value={idEliminar} onChange={handleChange} required />
                </div>
                <button type="submit">Eliminar Personaje</button>
            </form>
            {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
}

export default EliminarPersonaje;