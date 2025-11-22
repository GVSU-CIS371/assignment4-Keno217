import db from './firebase';
import { doc, setDoc } from 'firebase/firestore';

const bases = [
  { id: 'b1', name: 'Black Tea', color: '#8B4513' },
  { id: 'b2', name: 'Green Tea', color: '#C8E6C9' },
  { id: 'b3', name: 'Coffee', color: '#6F4E37' },
];

const creamers = [
  { id: 'c1', name: 'No Cream', color: 'transparent' },
  { id: 'c2', name: 'Milk', color: 'AliceBlue' },
  { id: 'c3', name: 'Cream', color: '#F5F5DC' },
  { id: 'c4', name: 'Half & Half', color: '#FFFACD' },
];

const syrups = [
  { id: 's1', name: 'No Syrup', color: 'transparent' },
  { id: 's2', name: 'Vanilla', color: '#FFEFD5' },
  { id: 's3', name: 'Caramel', color: '#DAA520' },
  { id: 's4', name: 'Hazelnut', color: '#6B4423' },
];

export async function setupFirestore() {
  try {
    console.log('Setting up Firestore collections...');

    // Add bases
    for (const base of bases) {
      await setDoc(doc(db, 'bases', base.id), base);
      console.log(`Added base: ${base.name}`);
    }

    // Add creamers
    for (const creamer of creamers) {
      await setDoc(doc(db, 'creamers', creamer.id), creamer);
      console.log(`Added creamer: ${creamer.name}`);
    }

    // Add syrups
    for (const syrup of syrups) {
      await setDoc(doc(db, 'syrups', syrup.id), syrup);
      console.log(`Added syrup: ${syrup.name}`);
    }

    console.log('Firestore setup complete!');
  } catch (error) {
    console.error('Error setting up Firestore:', error);
  }
}
