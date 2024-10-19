use ic_cdk::export::candid::{CandidType, Deserialize};
use ic_cdk_macros::*;
use ic_cdk::storage;

#[derive(CandidType, Deserialize, Clone)]
struct Location {
    latitude: f64,
    longitude: f64,
}

#[derive(CandidType, Deserialize, Clone)]
struct Incident {
    description: String,
    severity: String,
    location: Location,
}

#[update]
fn add_incident(description: String, severity: String, latitude: f64, longitude: f64) {
    let new_incident = Incident {
        description,
        severity,
        location: Location {
            latitude,
            longitude,
        },
    };
    let incidents: &mut Vec<Incident> = storage::get_mut();
    incidents.push(new_incident);
}

#[query]
fn get_incidents() -> Vec<Incident> {
    storage::get::<Vec<Incident>>().clone()
}