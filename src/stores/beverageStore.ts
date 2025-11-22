import { defineStore } from "pinia";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";
import tempretures from "../data/tempretures.json";
import db from "../firebase.ts";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    currentTemp: tempretures[0],
    bases: [] as BaseBeverageType[],
    currentBase: null as BaseBeverageType | null,
    syrups: [] as SyrupType[],
    currentSyrup: null as SyrupType | null,
    creamers: [] as CreamerType[],
    currentCreamer: null as CreamerType | null,
    beverages: [] as BeverageType[],
    currentBeverage: null as BeverageType | null,
    currentName: "",
  }),

  actions: {
    async init() {
      try {
        // Load bases from Firestore
        const basesSnapshot = await getDocs(collection(db, "bases"));
        this.bases = basesSnapshot.docs.map((doc) => doc.data() as BaseBeverageType);

        // Load creamers from Firestore
        const creamersSnapshot = await getDocs(collection(db, "creamers"));
        this.creamers = creamersSnapshot.docs.map((doc) => doc.data() as CreamerType);

        // Load syrups from Firestore
        const syrupsSnapshot = await getDocs(collection(db, "syrups"));
        this.syrups = syrupsSnapshot.docs.map((doc) => doc.data() as SyrupType);

        // Set default values
        this.currentBase = this.bases[0] || null;
        this.currentCreamer = this.creamers[0] || null;
        this.currentSyrup = this.syrups[0] || null;

        // Listen to beverages collection for real-time updates
        onSnapshot(collection(db, "beverages"), (snapshot) => {
          this.beverages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          } as BeverageType));
        });
      } catch (error) {
        console.error("Error initializing store:", error);
      }
    },

    async makeBeverage() {
      if (!this.currentBase || !this.currentCreamer || !this.currentSyrup || !this.currentName) {
        console.error("All fields must be selected and name must be provided");
        return;
      }

      try {
        const beverage: Omit<BeverageType, 'id'> = {
          name: this.currentName,
          temp: this.currentTemp,
          base: this.currentBase,
          creamer: this.currentCreamer,
          syrup: this.currentSyrup,
        };

        // Generate a unique ID based on timestamp
        const beverageId = `bev_${Date.now()}`;

        // Save to Firestore
        await setDoc(doc(db, "beverages", beverageId), beverage);

        console.log("Beverage saved successfully!");
      } catch (error) {
        console.error("Error saving beverage:", error);
      }
    },

    showBeverage(beverage: BeverageType) {
      this.currentBeverage = beverage;
      this.currentTemp = beverage.temp;
      this.currentBase = beverage.base;
      this.currentCreamer = beverage.creamer;
      this.currentSyrup = beverage.syrup;
    },
  },
});
