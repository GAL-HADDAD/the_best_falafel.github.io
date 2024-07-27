// Wait until the DOM is fully loaded 
//רק אז תתחיל הצגת הנתותים של הקוד
document.addEventListener('DOMContentLoaded', (event) => {
    //HTML התייחסות לאלמנטים עי שימוש במזהים מתוך  ה
    
    const tofes = document.getElementById('falafelForm');
    const submitBtn = document.getElementById('submitBtn');
    const orderSummary = document.getElementById('orderSummary');
    const fullNameInput = document.getElementById('full-name');
    const radioButtons = document.getElementsByName('quantity');
    const checkboxes = document.getElementsByName('additions');
    

    //בדיקת ולידיות לכל התיבות בהן שדה מילוי חובה
    //רק לאחר מילוי כל השדות תתאפשר לחיצה על כפתור השליחה
    const checkFormValidity = () => {
        console.log("checkFormValidity");
        const isFullNameFilled = fullNameInput.value.trim() !== '';
        const isRadioSelected = Array.from(radioButtons).some(radio => radio.checked);
        const isFormValid = isFullNameFilled && isRadioSelected;
        submitBtn.disabled = !isFormValid;
    };

    // מערך הבודק אילו בחירות עשה המשתמש מתוך הצ'ק בוקס וכפתורי הרדיו
    fullNameInput.addEventListener('input', checkFormValidity);
    Array.from(radioButtons).forEach(radio => radio.addEventListener('change', checkFormValidity));
    Array.from(checkboxes).forEach(checkbox => checkbox.addEventListener('change', checkFormValidity));

    // יצירת מחרוזת של סיכום ההזמנה
    tofes.addEventListener('submit', (event) => {
        //console.log("submit *******");
        event.preventDefault();
        const formData = new FormData(tofes);
        summary = "<strong>פרטי ההזמנה שלך:<br>"; 
        summary += `<strong>__________________</strong><br>`;
		summary += `<strong>שם מלא:</strong> ${formData.get('full-name')}<br>`;
        summary += `<strong>מספר כדורי פלאפל:</strong> ${formData.get('quantity')}<br>`;
        summary += `<strong>תוספות:</strong> ${Array.from(formData.getAll('additions')).join(', ')}<br>`;
        summary += `<strong>הערות:</strong> ${formData.get('comments')}<br>`;

        orderSummary.innerHTML = summary;
    });



    // פונקציה ליצירת אינטראקציה בעת לחיצה על כפתורי הצ'ק בוקס
    function handleCheckboxClick(event) {
        const checkbox = event.target;
        const imageId = checkbox.id + 'Img';
        const image = document.getElementById(imageId);

        //רק כאשר תתבצע לחיצה על כפתור הצ'ק בוקס תשתנה שקיפות התמונה מ0.5 ל1
        if (checkbox.checked) {
            image.style.opacity = 1.0;
            console.log('${ checkbox.value} is checked');
            //במידה ולא נבחרה תוספת, השקיפות של התמונה המקושרת אליה תשאר 0.5
        } else {
            image.style.opacity = 0.5;
            console.log('${ checkbox.value} is unchecked');
        }
    }

    // קורא לכל הצ'ק בוקסים
    // by their IDs
    const chipsCheckbox = document.getElementById('chips');
    const thinaCheckbox = document.getElementById('thina');
    const spicyCheckbox = document.getElementById('spicy');

    // כאן מתבצעת בדיקה האם נבחר אחד מכפתורי הצ'ק בוקס
    chipsCheckbox.addEventListener('change', handleCheckboxClick);
    thinaCheckbox.addEventListener('change', handleCheckboxClick);
    spicyCheckbox.addEventListener('change', handleCheckboxClick);
});


function showImage(imageId) {
    // פונקציה זו מציגה את תמונת הפיתה הריקה בתור ברירת מחדל
    //רק לאחר בחירה של מספר הכדורים התמונה תשתנה מברירת המחדל לתמונה המייצגת/המקושרת אל אותו מספר כדורים
    document.getElementById('defaultImage').style.display = 'none';
    document.getElementById('image1').style.display = 'none';
    document.getElementById('image2').style.display = 'none';
    document.getElementById('image3').style.display = 'none';

    // הצגת התמונה שנבחרה 
    // הכנסתי כאן גם בחירת מיקום מאחר ובהרצה התמונות לא היו ממורכזות
    document.getElementById(imageId).style.display = 'block';
    document.getElementById(imageId).style.margin = '0 auto'; // Center horizontally
}



