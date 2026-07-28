Este documento indica el formato en el que debe estar la información del archivo `Salud.js` que contiene información sobre centros de salud de Argentina.

El archivo debe contener un array de objetos JS con las siguientes propiedades:

```
{
    nombre: "",
    especialidad: "",
    provincia: "",
    ciudad: "",
    direccion: "",
    telefono: "",
    correo: ""
  }
```

A continuación se detalla el formato específico que debe seguir cada propiedad:

## `nombre`

- Title Case, sin comillas internas.
- Si hay números deben mostrarse como por ejemplo "N°13" y separado de nombre o acrónimo por un espacio.
- Especificidades como consultorios o secciones deben separarse con un "-", esto no aplica a nombres de centros de salud o sus numeraciones.
- Acrónimos deben aclararse antes de los mismos, los cuales deben estar entre paréntesis. Ej: "Centro de Atención Primaria (CAPS) N°1" o "Centro de Salud y Acción Comunitaria (CeSAC) N°1".
- Mostrar siempre que se pueda nombres propios completos, sin abreviación. Lo mismo para palabras como "General" (Gral.). No así para títulos como "Dr." (Doctor).
- Acrónimos comúnes y cómo deben escribirse con su casing correcto:
  - CAPS: Centro de Atención Primaria de Salud
  - CeSAC: Centro de Salud y Acción Comunitaria
  - CIC: Centro Integrador Comunitario
  - UPA: Unidad de Pronta Atención
  - CISI: Centro Interdisciplinario de Salud Integral
  - CAFyS: Centro de Atención y Formación en Salud

## `especialidad`

- Title Case, sin comillas internas.
- Tilde siempre que corresponda.
- Separadas por coma.
- Las únicas especialidades válidas son "Hormonización, Atención a Infancias, Endocrinología, Salud Mental, Cirugía de Masculinización Tórax, Ginecología, Grupo de Pares, Clínica Médica, Atención Integral, Trabajo Social" y deben mostrarse en ese órden.
- Si alguna especialidad está bajo un nombre simil a los válidos aplicarle el nombre que corresponda.
- Eliminar las especialidades que no estén en esa lista y no tengan similitud con una que lo esté.

## `provincia`

- Title Case, sin comillas internas.
- Tilde siempre que corresponda.
- Siempre debe haber una y sólo una por objeto.
- Las únicas provincias válidas son "Buenos Aires, CABA, Catamarca, Chaco, Chubut, Córdoba, Corrientes, Entre Ríos, Formosa, Jujuy, La Pampa, La Rioja, Mendoza, Misiones, Neuquén, Río Negro, Salta, San Juan, San Luis, Santa Cruz, Santa Fe, Santiago del Estero, Tierra del Fuego, Tucumán".
- "Ciudad Autónoma de Buenos Aires" y similares deben convertirse en "CABA".

## `ciudad`

- Title Case, sin comillas internas.
- Tilde siempre que corresponda.
- Siempre que se pueda mostrar en este formato "Municipio, Localidad". Ej: "Almirante Brown, Adrogué".
- En el caso de Córdoba Capital, poner "CBA".
- En el caso de CABA mostrar el barrio correspondiente a la `direccion`. Los únicos válidos son "Agronomía, Almagro, Balvanera, Barracas, Belgrano, Boedo, Caballito, Chacarita, Coghlan, Colegiales, Constitución, Flores, Floresta, La Boca, La Paternal, Liniers, Mataderos, Monserrat, Monte Castro, Nueva Pompeya, Núñez, Palermo, Parque Avellaneda, Parque Chacabuco, Parque Chas, Parque Patricios, Puerto Madero, Recoleta, Retiro, Saavedra, San Cristóbal, San Nicolás, San Telmo, Vélez Sársfield, Versalles, Villa Crespo, Villa del Parque, Villa Devoto, Villa General Mitre, Villa Lugano, Villa Luro, Villa Ortúzar, Villa Pueyrredón, Villa Real, Villa Riachuelo, Villa Santa Rita, Villa Soldati, Villa Urquiza". Convertir "Montserrat" a "Monserrat".
- Si no están en dicho formato buscar a qué municipio corresponda la localidad que esté o viceversea, o el barrio al que perteneces la dirección. Siempre considerando la `provincia` a la que pertenecen ya que puede haber mismos nombres en distintas provincias.
- Mostrar siempre que se pueda nombres propios completos, sin abreviación. Lo mismo para palabras como "General" (Gral.) excepto en el caso de "Avenida" o similes que debe ser "Av.".

## `direccion`

- Title Case, sin comillas internas.
- Tilde siempre que corresponda.
- Mostrar siempre que se pueda nombres propios completos, sin abreviación. Lo mismo para palabras como "General" (Gral.).
- Si la calle no tiene altura poner "S/N", a menos que sea intersección con otra calle.
- En el caso de que sea una intersección de calles ponerla en formato "Calle A y Calle B".
- En el caso de esquinas poner "(esq. Nombre de Calle).
- Si la calle es una intersección (no tiene altura) no poner esquina.
- Si la calle se lista entre otras calles ponerlas en formato "Calle A entre Calle B y Calle C". No poner dentro de paréntesis, ni separar con coma, ni usar mayúsucla para "entre".
- Si la calle no tiene nombre sino sólo número (común en `ciudad` de "La Plata") ponerle de nombre "Calle" y separar la altura del nombre de la calle con una coma. Ej: "Calle 1, 345".
- Poner la altura sin "N°" antes.

## `telefono`

- Sólo números, paréntesis, guiones y (int. )
- Poner primero el código de área entre paréntesis y separarlo con un espacio del resto del número de teléfono.
- Si hay separación con guiones respetarla, sino no forzarla.
- Si hay interno ponerlo luego del número en formato "(int. )"
- Separar entre distintos números con "/".
- Agrupar números por código de área, si hay números con un mismo código de área deben ir juntos y separados de números con otro código de área. Separar entre códigos de área también con un "/". Ej: "(855) 123-345 / 123-345 / (444) 4656-34 3435-45", en este caso "123-345" tiene implícito el código de área (855) y "3435-45" el (444).
- En ocasiones que sólo cambian los últimos dos números pueden separarse con un / sin reescribir todo el número. Ej: "4546-1200/10/11" o "(444) 4636/7/8/9". Si cambian a partir de más de dos números finales, escribir todo el número y separarlo con "/". Ej: "5655-2345 / 5655-2145".
- Remover el 0 inicial de los códigos de área si lo tuviesen. Ej:(0345) debe ser (345).

## `email`

- Todo en minúscula.
- Separados por /
- Si no existe un email específicos para áreas de diversidad o género buscar algunos del hospital, sino el del área de salud del municipio o provincia. Deben estar en ese órden si son varios.
