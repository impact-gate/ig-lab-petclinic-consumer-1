export class AppointmentService {
  constructor(private petclinicUrl: string) {}

  async getOwner(ownerId: number) {
    const res = await fetch(`${this.petclinicUrl}/api/owners/${ownerId}`);
    const owner = await res.json();
    return { name: `${owner.firstName} ${owner.lastName}`, phone: owner.telephone };
  }

  async getPet(petId: number) {
    const res = await fetch(`${this.petclinicUrl}/api/pets/${petId}`);
    const pet = await res.json();
    return { petName: pet.name, dob: pet.birthDate, species: pet.type?.name };
  }

  async bookVisit(petId: number, date: string, description: string) {
    const res = await fetch(`${this.petclinicUrl}/api/visits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ petId, date, description }),
    });
    return res.json();
  }
}
