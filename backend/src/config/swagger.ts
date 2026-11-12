export const swaggerDocument = {
  "openapi": "3.0.3",
  "info": {
    "title": "Lagerverwaltung API",
    "version": "1.0.0",
    "description": "Dokumentation der aktuell implementierten Routen. Für Sitzungstests Swagger unter /api-docs/ auf demselben Backend öffnen. Testaufrufe verändern die Datenbank."
  },
  "servers": [
    {
      "url": "/",
      "description": "Backend, das diese Swagger-Seite bereitstellt"
    }
  ],
  "tags": [
    {
      "name": "Authentifizierung"
    },
    {
      "name": "Benutzer"
    },
    {
      "name": "Produkte"
    },
    {
      "name": "System"
    },
    {
      "name": "Lagerbewegungen"
    }
  ],
  "components": {
    "securitySchemes": {
      "sessionCookie": {
        "type": "apiKey",
        "in": "cookie",
        "name": "lager.sid",
        "description": "Durch POST /api/auth/login gesetztes Browsercookie. Im Authorize-Dialog keinen Cookiewert manuell eintragen."
      }
    },
    "schemas": {
      "Message": {
        "type": "object",
        "required": [
          "message"
        ],
        "properties": {
          "message": {
            "type": "string"
          }
        }
      },
      "AccountRequest": {
        "type": "object",
        "required": [
          "benutzerId",
          "benutzerVorname",
          "benutzerNachname",
          "benutzerEmail",
          "benutzerPasswort"
        ],
        "properties": {
          "benutzerId": {
            "type": "integer",
            "minimum": 1,
            "maximum": 2147483647
          },
          "benutzerVorname": {
            "type": "string",
            "minLength": 1,
            "description": "Nach dem Entfernen äußerer Leerzeichen darf der Wert nicht leer sein.",
            "maxLength": 255
          },
          "benutzerNachname": {
            "type": "string",
            "minLength": 1,
            "description": "Nach dem Entfernen äußerer Leerzeichen darf der Wert nicht leer sein.",
            "maxLength": 255
          },
          "benutzerEmail": {
            "type": "string",
            "minLength": 1,
            "description": "Nach dem Entfernen äußerer Leerzeichen darf der Wert nicht leer sein.",
            "maxLength": 255
          },
          "benutzerPasswort": {
            "type": "string",
            "writeOnly": true,
            "minLength": 1,
            "description": "Nicht nur Leerzeichen. Höchstens 72 UTF-8-Bytes für bcrypt."
          }
        }
      },
      "AccountCreated": {
        "type": "object",
        "required": [
          "message",
          "benutzerId"
        ],
        "properties": {
          "message": {
            "type": "string"
          },
          "benutzerId": {
            "type": "integer",
            "minimum": 1,
            "maximum": 2147483647
          }
        }
      },
      "Benutzer": {
        "type": "object",
        "required": [
          "benutzerId",
          "benutzerVorname",
          "benutzerNachname",
          "benutzerEmail",
          "benutzerRolle"
        ],
        "properties": {
          "benutzerId": {
            "type": "integer",
            "minimum": 1,
            "maximum": 2147483647
          },
          "benutzerVorname": {
            "type": "string"
          },
          "benutzerNachname": {
            "type": "string"
          },
          "benutzerEmail": {
            "type": "string"
          },
          "benutzerRolle": {
            "type": "string",
            "enum": [
              "LAGERVERWALTER",
              "LAGERASSISTENT"
            ]
          }
        }
      },
      "LoginRequest": {
        "type": "object",
        "required": [
          "benutzerEmail",
          "benutzerPasswort"
        ],
        "properties": {
          "benutzerEmail": {
            "type": "string",
            "minLength": 1,
            "description": "Nach dem Entfernen äußerer Leerzeichen darf der Wert nicht leer sein."
          },
          "benutzerPasswort": {
            "type": "string",
            "minLength": 1,
            "writeOnly": true
          }
        }
      },
      "LoginResponse": {
        "type": "object",
        "required": [
          "message",
          "benutzer"
        ],
        "properties": {
          "message": {
            "type": "string"
          },
          "benutzer": {
            "$ref": "#/components/schemas/Benutzer"
          }
        }
      },
      "ProduktCreate": {
        "type": "object",
        "required": [
          "produktId",
          "produktName",
          "produktBeschreibung"
        ],
        "properties": {
          "produktId": {
            "type": "integer",
            "minimum": 1,
            "maximum": 2147483647
          },
          "produktName": {
            "type": "string",
            "minLength": 1,
            "description": "Nach dem Entfernen äußerer Leerzeichen darf der Wert nicht leer sein."
          },
          "produktBeschreibung": {
            "type": "string",
            "minLength": 1,
            "description": "Nach dem Entfernen äußerer Leerzeichen darf der Wert nicht leer sein."
          }
        }
      },
      "ProduktPatch": {
        "type": "object",
        "properties": {
          "produktName": {
            "type": "string",
            "minLength": 1,
            "description": "Nach dem Entfernen äußerer Leerzeichen darf der Wert nicht leer sein."
          },
          "produktBeschreibung": {
            "type": "string",
            "minLength": 1,
            "description": "Nach dem Entfernen äußerer Leerzeichen darf der Wert nicht leer sein."
          }
        },
        "anyOf": [
          {
            "required": [
              "produktName"
            ]
          },
          {
            "required": [
              "produktBeschreibung"
            ]
          }
        ]
      },
      "Produkt": {
        "type": "object",
        "required": [
          "produktId",
          "produktName",
          "produktBeschreibung",
          "produktMenge",
          "erstelltVon"
        ],
        "properties": {
          "produktId": {
            "type": "integer",
            "minimum": 1,
            "maximum": 2147483647
          },
          "produktName": {
            "type": "string",
            "minLength": 1,
            "description": "Nach dem Entfernen äußerer Leerzeichen darf der Wert nicht leer sein."
          },
          "produktBeschreibung": {
            "type": "string",
            "minLength": 1,
            "description": "Nach dem Entfernen äußerer Leerzeichen darf der Wert nicht leer sein."
          },
          "produktMenge": {
            "type": "string",
            "example": "0.000",
            "description": "PostgreSQL DECIMAL, von Sequelize üblicherweise als Zeichenkette zurückgegeben."
          },
          "erstelltVon": {
            "type": "integer",
            "minimum": 1,
            "maximum": 2147483647
          }
        }
      },
      "Warenbewegung": {
        "type": "object",
        "properties": {
          "bewegungId": {
            "type": "integer"
          },
          "produktId": {
            "type": "integer"
          },
          "benutzerId": {
            "type": "integer"
          },
          "bewegungTyp": {
            "type": "string",
            "enum": [
              "EINGANG",
              "AUSGANG"
            ]
          },
          "menge": {
            "type": "string",
            "example": "3.000"
          },
          "bewegungsDatum": {
            "type": "string",
            "format": "date-time"
          },
          "bemerkung": {
            "type": "string",
            "nullable": true
          }
        }
      }
    }
  },
  "paths": {
    "/": {
      "get": {
        "summary": "Backend prüfen",
        "tags": [
          "System"
        ],
        "security": [],
        "responses": {
          "200": {
            "description": "Backend erreichbar",
            "content": {
              "text/html": {
                "schema": {
                  "type": "string"
                },
                "example": "Hello Wold !"
              }
            }
          },
          "500": {
            "description": "Unerwarteter Server- oder Datenbankfehler. Der aktuelle Express-Standardhandler kann HTML zurückgeben."
          }
        }
      }
    },
    "/api/auth/register": {
      "post": {
        "summary": "Lagerverwalter registrieren",
        "tags": [
          "Authentifizierung"
        ],
        "security": [],
        "responses": {
          "201": {
            "description": "Konto angelegt",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AccountCreated"
                }
              }
            }
          },
          "400": {
            "description": "Ungültige Eingaben",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "409": {
            "description": "Benutzer-ID oder E-Mail-Adresse bereits vergeben",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "500": {
            "description": "Unerwarteter Server- oder Datenbankfehler. Der aktuelle Express-Standardhandler kann HTML zurückgeben."
          }
        },
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AccountRequest"
              },
              "example": {
                "benutzerId": 910001,
                "benutzerVorname": "Test",
                "benutzerNachname": "Verwalter",
                "benutzerEmail": "swagger.verwalter@example.test",
                "benutzerPasswort": "SwaggerTest-2026!"
              }
            }
          }
        },
        "description": "Rolle wird serverseitig auf LAGERVERWALTER gesetzt. Benutzer-ID manuell angeben. Gemäß aktuellem Projektstand wird die Anzahl der Verwalter nicht geprüft. Die Registrierung meldet den Benutzer noch nicht an."
      }
    },
    "/api/auth/login": {
      "post": {
        "summary": "Anmelden",
        "tags": [
          "Authentifizierung"
        ],
        "security": [],
        "responses": {
          "200": {
            "description": "Anmeldung erfolgreich; der Browser erhält das Sitzungscookie lager.sid.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginResponse"
                }
              }
            },
            "headers": {
              "Set-Cookie": {
                "schema": {
                  "type": "string"
                },
                "description": "lager.sid mit Path=/, HttpOnly und SameSite=Lax"
              }
            }
          },
          "400": {
            "description": "E-Mail-Adresse oder Passwort fehlen",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "401": {
            "description": "Ungültige Anmeldedaten",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "500": {
            "description": "Unerwarteter Server- oder Datenbankfehler. Der aktuelle Express-Standardhandler kann HTML zurückgeben."
          }
        },
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginRequest"
              },
              "example": {
                "benutzerEmail": "swagger.verwalter@example.test",
                "benutzerPasswort": "SwaggerTest-2026!"
              }
            }
          }
        },
        "description": "Erzeugt nach erfolgreicher Passwortprüfung eine neue Sitzung. Für geschützte Tests zuerst hier anmelden und denselben Browser sowie denselben Host verwenden."
      }
    },
    "/api/auth/logout": {
      "post": {
        "summary": "Abmelden",
        "tags": [
          "Authentifizierung"
        ],
        "security": [],
        "responses": {
          "200": {
            "description": "Sitzung gelöscht und Cookie entfernt",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "500": {
            "description": "Unerwarteter Server- oder Datenbankfehler. Der aktuelle Express-Standardhandler kann HTML zurückgeben."
          }
        },
        "description": "Im aktuellen Controller auch ohne vorherige Anmeldung aufrufbar."
      }
    },
    "/api/users/assistants": {
      "post": {
        "summary": "Lagerassistent anlegen",
        "tags": [
          "Benutzer"
        ],
        "security": [
          {
            "sessionCookie": []
          }
        ],
        "responses": {
          "201": {
            "description": "Assistent angelegt",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AccountCreated"
                }
              }
            }
          },
          "400": {
            "description": "Ungültige Eingaben",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "401": {
            "description": "Nicht angemeldet",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "403": {
            "description": "Nur Lagerverwalter erlaubt",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "409": {
            "description": "Benutzer-ID oder E-Mail-Adresse bereits vergeben",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "500": {
            "description": "Unerwarteter Server- oder Datenbankfehler. Der aktuelle Express-Standardhandler kann HTML zurückgeben."
          }
        },
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AccountRequest"
              },
              "example": {
                "benutzerId": 910002,
                "benutzerVorname": "Test",
                "benutzerNachname": "Assistent",
                "benutzerEmail": "swagger.assistent@example.test",
                "benutzerPasswort": "SwaggerTest-2026!"
              }
            }
          }
        },
        "description": "Rolle wird serverseitig auf LAGERASSISTENT gesetzt. Erfordert eine gültige Verwaltersitzung."
      }
    },
    "/api/products": {
      "post": {
        "summary": "Produkt anlegen",
        "tags": [
          "Produkte"
        ],
        "security": [
          {
            "sessionCookie": []
          }
        ],
        "responses": {
          "201": {
            "description": "Produkt angelegt",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Produkt"
                }
              }
            }
          },
          "400": {
            "description": "Ungültige Produktdaten",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "401": {
            "description": "Nicht angemeldet",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "403": {
            "description": "Nur Lagerverwalter erlaubt",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "409": {
            "description": "Produkt-ID bereits vergeben",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "500": {
            "description": "Unerwarteter Server- oder Datenbankfehler. Der aktuelle Express-Standardhandler kann HTML zurückgeben."
          }
        },
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ProduktCreate"
              },
              "example": {
                "produktId": 920001,
                "produktName": "Swagger Testprodukt",
                "produktBeschreibung": "Nur für den API-Test"
              }
            }
          }
        },
        "description": "Bestand beginnt bei 0. erstelltVon wird aus dem angemeldeten Benutzer übernommen. Produkt-ID manuell angeben."
      },
      "get": {
        "tags": [
          "Produkte"
        ],
        "summary": "Alle Produkte anzeigen",
        "responses": {
          "200": {
            "description": "Erfolgreich abgerufen",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "": "#/components/schemas/Produkt"
                  }
                }
              }
            }
          },
          "500": {
            "description": "Serverfehler",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/products/{id}": {
      "parameters": [
        {
          "name": "id",
          "in": "path",
          "required": true,
          "schema": {
            "type": "integer",
            "minimum": 1,
            "maximum": 2147483647
          },
          "example": 920001
        }
      ],
      "patch": {
        "summary": "Produktinformationen ändern",
        "tags": [
          "Produkte"
        ],
        "security": [
          {
            "sessionCookie": []
          }
        ],
        "responses": {
          "200": {
            "description": "Produkt aktualisiert",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "400": {
            "description": "Ungültige ID oder Eingaben",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "401": {
            "description": "Nicht angemeldet",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "403": {
            "description": "Nur Lagerverwalter erlaubt",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "404": {
            "description": "Produkt nicht gefunden",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "500": {
            "description": "Unerwarteter Server- oder Datenbankfehler. Der aktuelle Express-Standardhandler kann HTML zurückgeben."
          }
        },
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ProduktPatch"
              },
              "example": {
                "produktName": "Swagger Testprodukt geändert"
              }
            }
          }
        },
        "description": "Mindestens Name oder Beschreibung angeben. Bestand und Ersteller werden nicht geändert."
      },
      "delete": {
        "summary": "Produkt löschen",
        "tags": [
          "Produkte"
        ],
        "security": [
          {
            "sessionCookie": []
          }
        ],
        "responses": {
          "204": {
            "description": "Produkt gelöscht; kein Antwortinhalt"
          },
          "400": {
            "description": "Ungültige ID",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "401": {
            "description": "Nicht angemeldet",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "403": {
            "description": "Nur Lagerverwalter erlaubt",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "404": {
            "description": "Produkt nicht gefunden",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          },
          "500": {
            "description": "Unerwarteter Server- oder Datenbankfehler. Der aktuelle Express-Standardhandler kann HTML zurückgeben."
          }
        },
        "description": "Löscht tatsächlich Daten. Ausschließlich ein eigens angelegtes Testprodukt verwenden. Der aktuelle Controller enthält keine zusätzliche Prüfung auf MongoDB-Bewegungen."
      },
      "get": {
        "tags": [
          "Produkte"
        ],
        "summary": "Ein Produkt anzeigen",
        "responses": {
          "200": {
            "description": "Erfolgreich abgerufen",
            "content": {
              "application/json": {
                "schema": {
                  "": "#/components/schemas/Produkt"
                }
              }
            }
          },
          "500": {
            "description": "Serverfehler",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Produkt nicht gefunden",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/products/search": {
      "get": {
        "tags": [
          "Produkte"
        ],
        "summary": "Produkte nach Namen suchen",
        "responses": {
          "200": {
            "description": "Erfolgreich abgerufen",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "": "#/components/schemas/Produkt"
                  }
                }
              }
            }
          },
          "500": {
            "description": "Serverfehler",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Kein Treffer oder ungültiger Suchbegriff",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        },
        "parameters": [
          {
            "name": "name",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string"
            },
            "example": "Karton"
          }
        ]
      }
    },
    "/api/products/{id}/movements": {
      "get": {
        "tags": [
          "Produkte"
        ],
        "summary": "Bewegungen eines Produkts anzeigen",
        "responses": {
          "200": {
            "description": "Erfolgreich abgerufen",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "": "#/components/schemas/Warenbewegung"
                  }
                }
              }
            }
          },
          "500": {
            "description": "Serverfehler",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        },
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          }
        ]
      }
    },
    "/api/products/{id}/outgoing": {
      "get": {
        "tags": [
          "Produkte"
        ],
        "summary": "Ausgangsmengen pro Tag anzeigen",
        "responses": {
          "200": {
            "description": "Erfolgreich abgerufen",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "datum": {
                        "type": "string",
                        "format": "date"
                      },
                      "menge": {
                        "type": "number"
                      }
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Serverfehler",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Ungültige Produkt-ID oder Gruppierung",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        },
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          },
          {
            "name": "groupBy",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "enum": [
                "day"
              ]
            },
            "example": "day"
          }
        ]
      }
    },
    "/api/stock/wareneingang": {
      "post": {
        "summary": "Wareneingang buchen",
        "tags": [
          "Lagerbewegungen"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "produktId",
                  "benutzerId",
                  "menge"
                ],
                "properties": {
                  "produktId": {
                    "type": "integer",
                    "minimum": 1
                  },
                  "benutzerId": {
                    "type": "integer",
                    "minimum": 1
                  },
                  "menge": {
                    "type": "number",
                    "minimum": 0,
                    "exclusiveMinimum": true
                  }
                }
              },
              "example": {
                "produktId": 1,
                "benutzerId": 1,
                "menge": 3
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Bewegung erfasst",
            "content": {
              "application/json": {
                "schema": {
                  "": "#/components/schemas/Warenbewegung"
                }
              }
            }
          },
          "400": {
            "description": "Buchung fehlgeschlagen",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Serverfehler",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/stock/warenausgang": {
      "post": {
        "summary": "Warenausgang buchen",
        "tags": [
          "Lagerbewegungen"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "produktId",
                  "benutzerId",
                  "menge"
                ],
                "properties": {
                  "produktId": {
                    "type": "integer",
                    "minimum": 1
                  },
                  "benutzerId": {
                    "type": "integer",
                    "minimum": 1
                  },
                  "menge": {
                    "type": "number",
                    "minimum": 0,
                    "exclusiveMinimum": true
                  }
                }
              },
              "example": {
                "produktId": 1,
                "benutzerId": 1,
                "menge": 3
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Bewegung erfasst",
            "content": {
              "application/json": {
                "schema": {
                  "": "#/components/schemas/Warenbewegung"
                }
              }
            }
          },
          "400": {
            "description": "Buchung fehlgeschlagen",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Serverfehler",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
