// Different functions for different pages, allows us to remove elements on specific types

// For our button and scales for when I get around to adding quiz/course versions
function callPDFPrint() {

  // Do stuff based on what page we're on
  var currentUrl = window.location.href;
  if (currentUrl.indexOf("/mod/quiz/review.php") != -1) {
      attemptPrint();
  }
  
  else {
      alert('This is not a valid page, please open a quiz in preview mode or a quiz attempt');
  }

}

async function attemptPrint() {
    const opt = { 
      filename: 'attempt.pdf',
      image: { type: 'jpeg', quality: 100 },
      pagebreak: { avoid: '' },
      html2canvas: { scale: 1.5, scrollY: 5, scrollX: 0},
      jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait', precision: 1 }
    };
  
    // Clone the 'region-main' element, we need this to avoid messing with the current page
    const regionMain = document.getElementById('region-main').cloneNode(true);

    // Shove it left a wee bit
    regionMain.style.marginLeft = '-170px';
  
    // Remove all unnecessary elements from the cloned 'region-main'
    removeElements(regionMain);
  
    // Print
    html2pdf().set(opt).from(regionMain).save();
}

// Remove elements, resize attachmnents and remove comment boxes if they contain nothing
// NOTE: Iterate loops in reverse due to html rearranging dynamically
function removeElements(regionMain) {
    // Fit the images to the page
    const images = regionMain.getElementsByClassName('attachmentImage');
    for (let x = images.length - 1; x >= 0; x--) {
      images[x].style.maxWidth = '380px';
      images[x].style.maxHeight = '400px';
    }
  
    // Remove comment boxes if they contain nothing
    const comments = regionMain.getElementsByClassName('comment clearfix');
    for (let x = comments.length - 1; x >= 0; x--) {
      if (comments[x].children[1].className !== 'core_question__commentText') {
        comments[x].remove();
      }
    }
  
    // Remove comment links
    const commentlinks = regionMain.getElementsByClassName('commentlink');
    for (let x = commentlinks.length - 1; x >= 0; x--) {
      commentlinks[x].remove();
    }
  
    // Remove question flag
    const questionflag = regionMain.getElementsByClassName('questionflag');
    for (let x = questionflag.length - 1; x >= 0; x--) {
      questionflag[x].remove();
    }
  
    // Remove grade
    const grade = regionMain.getElementsByClassName('grade');
    for (let x = grade.length - 1; x >= 0; x--) {
      grade[x].remove();
    }
  
    // Remove edit question link
    const editquestion = regionMain.getElementsByClassName('editquestion');
    for (let x = editquestion.length - 1; x >= 0; x--) {
      editquestion[x].remove();
    }

    // Remove the submit button
    const submitbutton = regionMain.getElementsByClassName('submitbtns');
    for (let x = submitbutton.length - 1; x >= 0; x--) {
        submitbutton[x].remove();
    }
}
  