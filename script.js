getDepartmentData();

const leftMenu_container = document.querySelector('.left-menu-container');
const leftMenu = document.querySelector('.left-menu');
const leftMenu_btn = document.querySelector('.left-menu-btn');
const closeMenu_btn = document.querySelector('.close-menu-btn');
const body = document.querySelector('body');
const header = document.getElementById('header');
const navbar = document.getElementById('navbar');

leftMenu_btn.addEventListener('click', () => {
    leftMenu_container.classList.add('active');
    leftMenu.classList.add('active');
    body.style.overflow = 'hidden';
});

closeMenu_btn.addEventListener('click', () => {
    leftMenu_container.classList.remove('active');
    leftMenu.classList.remove('active');
    body.style.overflow = 'auto';
});
leftMenu_container.addEventListener('click', (e) => {
    if (e.target === leftMenu_container) {
        leftMenu_container.classList.remove('active');
        leftMenu.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.style.height = "70px";
        header.style.position = "fixed";
        navbar.style.marginTop = "70px";
    } else {
        header.style.height = "105px";
        header.style.position = "static";
        navbar.style.marginTop = "0px";
    }
}

const left_btn = document.querySelector('.left-arrow');
left_btn.addEventListener('click', () => {
    document.querySelector('.offers-articles').scrollBy(-270, 0);
});

const right_btn = document.querySelector('.right-arrow');
right_btn.addEventListener('click', () => {
    document.querySelector('.offers-articles').scrollBy(270, 0);
});

const departments_btn = document.querySelector('.departments-btn');
const arrow = document.querySelector('#arrow');
const departmentsContainer = document.querySelector('.departments-container');
const subDepartments = document.querySelector('.sub-departments');

departments_btn.addEventListener('mouseover', () => {
    arrow.style.transform = 'rotate(-180deg)';
    departmentsContainer.style.display = 'flex';
    subDepartmentWrapper.innerHTML = '';
});
document.addEventListener('mousemove', (e) => {
    const to = e.target;

    if (!departmentsContainer.contains(to) && !departments_btn.contains(to)) {
        arrow.style.transform = 'rotate(0deg)';
        departmentsContainer.style.display = 'none';
    }
});

let departmentID = "";
const departmentWrapper = document.querySelector('.departments');
const subDepartmentWrapper = document.querySelector('.sub-departments');
const departmentItensWrapper = document.querySelector('.department-itens');
departmentWrapper.innerHTML = '';
subDepartmentWrapper.innerHTML = '';

let subDepartmentElement = '';

function getDepartmentData() {
    fetch('departments_data.json')
    .then(response => response.json())
    .then(data => {
            data.Departments.forEach(department => {
                Object.keys(department).forEach(departmentName => {

                    const departmentElement = `
                <li id="${departmentName}">
                    <span>${departmentName}</span>
                    <i class="fa-solid fa-angle-right"></i>
                </li>
                `;
                    departmentWrapper.innerHTML += departmentElement;
                });

                departmentWrapper.addEventListener('mouseover', (e) => {
                    const target = e.target;
                    departmentItensWrapper.innerHTML = '';
                    if (target.id) {
                        departmentID = target.id;
                        subDepartmentWrapper.innerHTML = `<li>
                                        <a href="">Ver tudo de ${target.id}</a>
                                    </li>`;

                        if (department[departmentID]) {
                            department[departmentID].forEach(subDepartment => {
                                Object.keys(subDepartment).forEach(subDepartmentName => {
                                    subDepartmentElement = `
                                    <li id="${subDepartmentName}">
                                        <span>${subDepartmentName}</span>
                                        <i class="fa-solid fa-angle-right"></i>
                                    </li>
                                    `;
                                    subDepartmentWrapper.innerHTML += subDepartmentElement; 
                                });

                                subDepartmentWrapper.addEventListener('mouseover', (e) => {
                                    const subtarget = e.target;
                                    if (subtarget.id) {
                                        departmentItensWrapper.style.display = 'block';
                                      const subDepartmentID = subtarget.id;
                                      
                                      if (subDepartment[subDepartmentID]) {
                                          departmentItensWrapper.innerHTML = '';
                                          departmentItensWrapper.innerHTML = `
                                          <li>
                                            <a href="">Ver tudo de ${subtarget.id}</a>
                                        </li>`;
                                  
                                        subDepartment[subDepartmentID].forEach(item => {
                                          const itemElement = `
                                            <li>
                                              <a href="">${item}</a>
                                            </li>`;
                                          departmentItensWrapper.innerHTML += itemElement;
                                        });
                                      }
                                    }
                                  
                                    subtarget.addEventListener('mouseover', (e) => {
                                      if (e.target.classList.contains('department-itens')) {
                                        departmentItensWrapper.innerHTML = itemElement;
                                      }                                      
                                    });
                                  });
                                  
                            });
                        }else {
                            console.warn('Department not found');
                        }
                    }
                });
        });
        })
        .catch(error => console.error('Erro:', error));
}