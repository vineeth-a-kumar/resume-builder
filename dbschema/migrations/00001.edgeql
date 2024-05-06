CREATE MIGRATION m13nci4tsvieqw5fusv7oqfve467rent627ztdhjfd3mwcgc5ndbqa
    ONTO initial
{
  CREATE TYPE default::Address {
      CREATE PROPERTY city: std::str;
      CREATE PROPERTY house_name: std::str;
  };
  CREATE TYPE default::User {
      CREATE LINK address: default::Address;
      CREATE REQUIRED PROPERTY name: std::str;
  };
};
