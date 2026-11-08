// Credits transcribed from Brad's supplied résumé; photo credits from supplied filenames.
export const regionalCredits = [
  { production: 'Fiddler on the Roof', role: 'Motel', company: 'Porthouse Theatre', director: 'Terri Kent' },
  { production: 'The Play That Goes Wrong', role: 'Dennis', company: 'Starlight Mountain Theatre', director: 'Skye Davis' },
  { production: 'The Lion, the Witch…', role: 'Tumnus', company: 'Players Guild Theatre', director: 'Justin Edenhofer' },
  { production: 'High School Musical', role: 'Troy Bolton', company: 'Starlight Mountain Theatre', director: 'Skye Davis' },
  { production: 'Mary Poppins', role: 'Robertson Ay', company: 'Starlight Mountain Theatre', director: 'Skye Davis' },
  { production: 'Singin’ in the Rain', role: 'RF Simpson', company: 'Starlight Mountain Theatre', director: 'Skye Davis' },
  { production: 'Seven Brides for Seven Brothers', role: 'Caleb', company: 'Starlight Mountain Theatre', director: 'Skye Davis' },
  { production: 'Hello, Dolly!', role: 'Ambrose Kemper', company: 'Starlight Mountain Theatre', director: 'Jan Davis' },
  { production: 'The Scarlet Pimpernel', role: 'Ben', company: 'Starlight Mountain Theatre', director: 'Ed Davis' },
  { production: 'Elf', role: 'Charlie / Mall Santa', company: 'Players Guild Theatre', director: 'Matthew Heppe' },
  { production: 'School of Rock', role: 'Ensemble', company: 'Porthouse Theatre', director: 'Terri Kent' },
  { production: 'Sweeney Todd', role: 'Ensemble / Anthony (understudy)', company: 'Players Guild Theatre', director: 'Tess Burgler' },
  { production: 'Shrek', role: 'Ensemble', company: 'Starlight Mountain Theatre', director: 'Skye Davis' },
];
export const educationalCredits = [
  { production: 'Pride and Prejudice', role: 'Mr Darcy', company: 'Kent State University', director: 'Fabio Polanco' },
  { production: 'Perfect Arrangement', role: 'Bob Martindale', company: 'Kent State University', director: 'Caitlin Kane' },
];
export const photographs = [
  { title: 'Fiddler on the Roof', role: 'Motel', company: 'Porthouse Theatre', photographer: 'Rami Daud', file: 'fiddler-on-the-roof-motel', width: 886, height: 748, alt: 'Brad Motyer as Motel, surrounded by the ensemble in Fiddler on the Roof' },
  { title: 'Pride and Prejudice', role: 'Mr Darcy', company: 'Kent State University', photographer: 'Bob Christy', file: 'pride-and-prejudice-mr-darcy', width: 1110, height: 740, alt: 'Brad Motyer as Mr Darcy, seated at a writing desk holding a quill' },
  { title: 'Mary Poppins', role: 'Robertson Ay', company: 'Starlight Mountain Theatre', photographer: 'Michael Carrier', file: 'mary-poppins-robertson-ay', width: 2000, height: 1333, alt: 'Brad Motyer as Robertson Ay performing a scene with a fellow cast member in Mary Poppins' },
  { title: 'Perfect Arrangement', role: 'Bob Martindale', company: 'Kent State University', photographer: 'Bob Christy', file: 'perfect-arrangement-bob-martindale', width: 570, height: 850, alt: 'Brad Motyer as Bob Martindale, seated on a sofa with a fellow cast member in Perfect Arrangement' },
  { title: 'Seven Brides for Seven Brothers', role: 'Caleb', company: 'Starlight Mountain Theatre', photographer: 'Michael Carrier', file: 'seven-brides-for-seven-brothers-caleb', width: 2000, height: 1333, alt: 'Brad Motyer performing with the ensemble in Seven Brides for Seven Brothers' },
  { title: 'Singin’ in the Rain', role: 'RF Simpson', company: 'Starlight Mountain Theatre', photographer: 'Michael Carrier', file: 'singin-in-the-rain-rf-simpson', width: 1333, height: 2000, alt: 'Brad Motyer as RF Simpson in a waistcoat and checked trousers in Singin’ in the Rain' },
  { title: 'School of Rock', role: 'Ensemble', company: 'Porthouse Theatre', photographer: 'Rami Daud', file: 'school-of-rock-ensemble', width: 1103, height: 740, alt: 'Brad Motyer seated in a suit during a scene in School of Rock' },
];
export const imageUrl = (file: string) => `./images/${file}.webp`;
export const headshot = imageUrl('brad-motyer-headshot');
export const portrait = imageUrl('brad-motyer-portrait');
