const id = '14LBfT135qrQ_Uu1E2warPfec-GDqfrh0Lk7cUiZqixI';      
const sheetNews = SpreadsheetApp.openById(id).getSheetByName('news'); 
var lastRowNews = sheetNews.getLastRow(); 
const sheetChars = SpreadsheetApp.openById(id).getSheetByName('persons'); 
var lastRowChars = sheetChars.getLastRow(); 

function doPost(e)                                          
{
switch(e.parameter['operation'])                            
      {
        case 'news':                                        
        holder=news(e);
        return ContentService.createTextOutput(JSON.stringify(holder)).setMimeType(ContentService.MimeType.JSON);                                            

        case 'chars':                                      
        holder=chars(e);                        
        return ContentService.createTextOutput(JSON.stringify(holder)).setMimeType(ContentService.MimeType.JSON)


        case 'char':                                     
        holder=char(e);                                          
        return ContentService.createTextOutput(JSON.stringify(holder)).setMimeType(ContentService.MimeType.JSON)
      }
}

function news(e)                                          
{
  const holder = [];                                      
  for(var row = 2; row <= lastRowNews; row = row + 1)        
    {
      const temp = {                                       
      title: sheetNews.getRange(row,1).getValue(),
      content: sheetNews.getRange(row,2).getValue(),
      time: sheetNews.getRange(row,3).getValue(),
    }
    holder.push(temp);                                     
    } 
    return holder;
}

function chars(e)                                        
{
  const holder = [];                                       
  for(var row = 2; row <= lastRowChars; row = row + 1)           
    {
      const temp = {                                        
      name: sheetChars.getRange(row,1).getValue(),
      image: sheetChars.getRange(row,6).getValue(),
    }
    holder.push(temp);                                     
    } 
    return holder;
}


function char(e)                                           
{
  const holder = [];                                       
  for(var row = 2; row <= lastRowChars; row = row + 1)           
    {
      if(sheetChars.getRange(row,1).getValue()==e.parameter['name']){
      const temp = {                                        
      name: sheetChars.getRange(row,1).getValue(),
      features: sheetChars.getRange(row,2).getValue(),
      abilities: sheetChars.getRange(row,3).getValue(),
      inventory: sheetChars.getRange(row,4).getValue(),
      description: sheetChars.getRange(row,5).getValue(),
      image: sheetChars.getRange(row,6).getValue(),
    }
    holder.push(temp);                                     
    } }
    return holder;
}