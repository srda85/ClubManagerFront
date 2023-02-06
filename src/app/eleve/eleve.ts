export interface IEleve {
 //les nom de variables doivent être les mêmes que celle de l'API
  id : number,
  nom: string,
  prenom:string,
  dateNaissance:Date,
  adresse:string,
  gsm:string,
  email:string,
  ceinture:string,
  abonnementsId:number[]
  statut:string
  role:string
}
