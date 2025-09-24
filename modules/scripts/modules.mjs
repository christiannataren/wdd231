import byuiCourse from './course.mjs';
import { populateSections } from './sections.mjs';
import { setTitle, renderSections } from "./output.mjs";





renderSections(byuiCourse.sections);
populateSections(byuiCourse);
document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = document.querySelector("#sectionNumber").value;
    byuiCourse.changeEnrollment(sectionNum);
});

document.querySelector("#dropStudent").addEventListener("click", function () {
    const sectionNum = document.querySelector("#sectionNumber").value;
    byuiCourse.changeEnrollment(sectionNum, false);
});