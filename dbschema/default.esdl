module default {

  type Address {
    house_name: str;
    street: str;
    city: str;
    state: str;
    pin_code: str;
  }

  type UserData {
    required name: str;
    dob: cal::local_date;
    required email: str;
    phone: str;
    address: Address;
    multi skills: Skills;
    multi education: Education;
    multi work: WorkExperience;
    multi hobbies: Hobbies;
    multi projects: Projects;
    multi certificates: Certificates;
  }

  type Skills {
    required title: str;
  }

  type Education {
    course: str;
    institute: str;
    university: str;
    marks: str;
    start_date: cal::local_date;
    end_date: cal::local_date;
  }

  type WorkExperience {
    company: str;
    designation: str;
    description: str;
    multi technologies: Technologies;
    start_date: cal::local_date;
    end_date: cal::local_date;
  }

  type Hobbies {
    required title: str;
  }

  type Technologies {
    required title: str;
  }

  type Certificates {
    title: str;
    authority: str;
    url: str;
    start_date: cal::local_date;
    end_date: cal::local_date;
  }

  type Projects {
    title: str;
    description: str;
  }

};