// src/components/IncidentList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Form, Button } from 'react-bootstrap';
import IncidentMap from './IncidentMap'; // Mapa de incidentes
import IncidentHeatmap from './IncidentHeatmap'; // Mapa de calor
import MapComponent from './MapComponent'; // Importa el nuevo componente del mapa

const IncidentList = () => {
    const [incidents, setIncidents] = useState([]);
    const [filter, setFilter] = useState('');
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [patrolRoutes, setPatrolRoutes] = useState([]);

    const fetchIncidents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/incidents');
            setIncidents(response.data);
            updatePatrolRoutes(response.data); // Actualiza las rutas de patrullas
        } catch (error) {
            console.error('Error al obtener incidentes:', error);
        }
    };

    useEffect(() => {
        fetchIncidents();
    }, []);

    const updatePatrolRoutes = (incidents) => {
        // Generar rutas de patrullas a partir de los incidentes
        const routes = incidents.map(incident => {
            const lat = incident.location.coordinates[1];
            const lng = incident.location.coordinates[0];
            return [
                { lat: lat + 0.001, lng: lng + 0.001 }, // Un punto cerca del incidente
                { lat: lat + 0.001, lng: lng - 0.001 }, // Otro punto cerca
                { lat: lat - 0.001, lng: lng - 0.001 }, // Otro punto cerca
                { lat: lat - 0.001, lng: lng + 0.001 }, // Otro punto cerca
                { lat: lat + 0.001, lng: lng + 0.001 }, // Regresar al primer punto
            ];
        });
        setPatrolRoutes(routes);
    };

    const filteredIncidents = incidents.filter(incident =>
        incident.severity.toLowerCase().includes(filter.toLowerCase())
    );

    const clearFilter = () => {
        setFilter('');
    };

    const handleRowClick = (incident) => {
        setSelectedIncident(incident);
    };

    // Separar incidentes falsos y reales
    const realIncidents = filteredIncidents.filter(incident => !incident.isFalseReport);
    const falseIncidents = filteredIncidents.filter(incident => incident.isFalseReport);

    return (
        <Container>
            <h2 className="my-4">Lista de Incidentes</h2>
            <Form.Group controlId="filter" className="mb-3">
                <div className="d-flex">
                    <Form.Select
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)} 
                        className="me-2"
                    >
                        <option value="">Filtrar por gravedad</option>
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                    </Form.Select>
                    <Button variant="outline-secondary" onClick={clearFilter}>
                        Limpiar
                    </Button>
                </div>
            </Form.Group>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Gravedad</th>
                        <th>Ubicación</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredIncidents.length > 0 ? (
                        filteredIncidents.map((incident) => (
                            <tr key={incident._id} onClick={() => handleRowClick(incident)} style={{ cursor: 'pointer' }}>
                                <td>{incident._id}</td>
                                <td>{incident.description}</td>
                                <td>{incident.severity}</td>
                                <td>{`Lat: ${incident.location.coordinates[1]}, Lng: ${incident.location.coordinates[0]}`}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No se encontraron incidentes.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {/* Mapa de incidentes reales */}
            <h4>Mapa de Reportes Reales</h4>
            <IncidentMap incidents={realIncidents} selectedIncident={selectedIncident} />
            {/* Mapa de incidentes falsos */}
            <h4>Mapa de Reportes Falsos</h4>
            <IncidentMap incidents={falseIncidents} selectedIncident={selectedIncident} />
            <div className='mb-3'>
                {/* Componente del Mapa */}
                <h4>Mapa En Tiempo Real</h4>
                {/* Pasamos las rutas al componente del mapa */}
                <MapComponent incidents={filteredIncidents} patrolRoutes={patrolRoutes} />
            </div>
        </Container>
    );
};

export default IncidentList;
