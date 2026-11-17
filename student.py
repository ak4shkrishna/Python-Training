class Person:
    def __init__(self, name):
        self.name = name

    def display(self):
        print(f"Name: {self.name}")


class Patient(Person):
    def __init__(self, name, disease):
        super().__init__(name)
        self.disease = disease

    def display(self):
        print(f"Patient name: {self.name}, Disease: {self.disease}")


class Doctor(Person):
    def __init__(self, name, specialty):
        super().__init__(name)
        self.specialty = specialty

    def display(self):
        print(f"Doctor name: {self.name}, Specialty: {self.specialty}")


class Hospital:
    def __init__(self):
        self.patients = []
        self.doctors = []

    def add_patient(self, patient):
        self.patients.append(patient)
        print(f"{patient.name} admitted to the hospital.")

    def add_doctor(self, doctor):
        self.doctors.append(doctor)
        print(f"{doctor.name} joined the hospital.")

    def show_patients(self):
        print("\nPatients in hospital:")
        if not self.patients:
            print("No patients registered.")
        for patient in self.patients:
            patient.display()

    def show_doctors(self):
        print("\nDoctors in hospital:")
        if not self.doctors:
            print("No doctors registered.")
        for doctor in self.doctors:
            doctor.display()


hospital = Hospital()

while True:
    print("\nHospital Management")
    print("1. Add patient")
    print("2. Add doctor")
    print("3. Show patients")
    print("4. Show doctors")
    print("5. Exit")

    choice = input("Choose an option: ").strip()

    if choice == "1":
        name = input("Enter patient name: ").strip()
        disease = input("Enter patient's disease: ").strip()
        if name and disease:
            hospital.add_patient(Patient(name, disease))
        else:
            print("Name and disease cannot be empty.")
    elif choice == "2":
        name = input("Enter doctor name: ").strip()
        specialty = input("Enter doctor's specialty: ").strip()
        if name and specialty:
            hospital.add_doctor(Doctor(name, specialty))
        else:
            print("Name and specialty cannot be empty.")
    elif choice == "3":
        hospital.show_patients()
        input("\nPress Enter to continue...")
    elif choice == "4":
        hospital.show_doctors()
        input("\nPress Enter to continue...")
    elif choice == "5":
        print("Goodbye!")
        break
    else:
        print("Invalid option. Please choose 1 to 5.")