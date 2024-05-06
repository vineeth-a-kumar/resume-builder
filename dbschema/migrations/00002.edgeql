CREATE MIGRATION m173jtkttsaizp4tjrmsfeoubqwq4swxkwjafseymsvnjsdcvoshka
    ONTO m13nci4tsvieqw5fusv7oqfve467rent627ztdhjfd3mwcgc5ndbqa
{
  ALTER TYPE default::Address {
      CREATE PROPERTY pin_code: std::str;
      CREATE PROPERTY state: std::str;
      CREATE PROPERTY street: std::str;
  };
  CREATE TYPE default::Certificates {
      CREATE PROPERTY authority: std::str;
      CREATE PROPERTY end_ate: cal::local_date;
      CREATE PROPERTY start_date: cal::local_date;
      CREATE PROPERTY title: std::str;
      CREATE PROPERTY url: std::str;
  };
  CREATE TYPE default::Education {
      CREATE PROPERTY course: std::str;
      CREATE PROPERTY end_ate: cal::local_date;
      CREATE PROPERTY institute: std::str;
      CREATE PROPERTY marks: std::str;
      CREATE PROPERTY start_date: cal::local_date;
      CREATE PROPERTY university: std::str;
  };
  CREATE TYPE default::Projects {
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY title: std::str;
  };
  CREATE TYPE default::Skills {
      CREATE REQUIRED PROPERTY title: std::str;
  };
  ALTER TYPE default::User {
      ALTER PROPERTY name {
          RENAME TO title;
      };
  };
  CREATE TYPE default::Technologies {
      CREATE REQUIRED PROPERTY title: std::str;
  };
  CREATE TYPE default::WorkExperience {
      CREATE MULTI LINK technologies: default::Technologies;
      CREATE PROPERTY company: std::str;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY designation: std::str;
      CREATE PROPERTY end_ate: cal::local_date;
      CREATE PROPERTY start_date: cal::local_date;
  };
  ALTER TYPE default::User {
      DROP LINK address;
  };
  ALTER TYPE default::User RENAME TO default::Hobbies;
  CREATE TYPE default::UserData {
      CREATE LINK address: default::Address;
      CREATE MULTI LINK certificates: default::Certificates;
      CREATE MULTI LINK education: default::Education;
      CREATE MULTI LINK hobbies: default::Hobbies;
      CREATE MULTI LINK projects: default::Projects;
      CREATE MULTI LINK skills: default::Skills;
      CREATE MULTI LINK work: default::WorkExperience;
      CREATE PROPERTY dob: cal::local_date;
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE PROPERTY phone: std::str;
  };
};
