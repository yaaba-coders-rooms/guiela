const express = require('express');
const csvParser = require('csv-parser');
const fs = require('fs');
//Fonction pour parser les fichiers csv
const getParserFile = async (csvFile1,csvFile2) => {
    //Tableau contenant les resulat des données bancaires
    let data_bank = [];
    //Tableau contenant les resultats des données de l'entreprise
    let data_entreprise = [];
    //On parse le premie fichier
    var reader = fs.createReadStream(csvFile1)
        .pipe(csvParser());
    for await (const chunk of reader){
        data_bank.push(chunk);
    }
    //On parse le deuxième fichier
    reader = fs.createReadStream(csvFile2)
        .pipe(csvParser());
    for await (const chunk of reader){
        data_entreprise.push(chunk);
    }
    let difference = [];
    let is_Okay  = [];
    let not_found = [];
    if (data_bank.length === data_entreprise.length){
        for (let i=0; i<data_bank.length; i++){
            if (data_bank[i].identifiant === data_entreprise[i].identifiant)
            {
                if(data_bank[i].amount === data_entreprise[i].amount){
                    is_Okay.push([data_bank[i],data_entreprise[i]]);
                }else{
                    difference.push([data_bank[i], data_entreprise[i]]);
                }
            }else{
                not_found.push([data_bank[i]], data_entreprise[i])
            }
        }
    }
    console.log("incohérence");
    console.log(difference);
    console.log("Correspondance");
    console.log(is_Okay);
    console.log("Non trouvé")
    console.log(not_found)

};

const data_bank_result =  getParserFile('../public/data_bank.csv','../public/data_entreprise.csv');
