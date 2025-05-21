window.addEventListener('load', () => {
    const header = document.getElementById('header');
    const navbar = document.getElementById('navbar');

    let headerComponent = '';
    if (window.innerWidth < 1024) {
        headerComponent = '/src/components/mobile-header.html';
    } else {
        headerComponent = '/src/components/header.html';
    }
    let fetchHeader = fetch(headerComponent)
    .then(response => response.text())
    .then(html => {
        header.innerHTML = html;
    })
    const fetchNav = fetch('/src/components/nav.html')
    .then(response => response.text())
    .then(html => {
        if (document.body.contains(navbar)) {
            navbar.innerHTML = html;
        }
    })
    Promise.all([fetchHeader, fetchNav])
    .then(() => {
        init();
    })
    .catch(error => console.error('Erro:', error));

    document.head.innerHTML += `
    <link rel="stylesheet" href="/src/css/responsive.css">
    `;
});
window.onload = function() {
    var link = top.document.createElement('link');
    link.href = '/icon.jpeg';
    link.rel = 'icon';
    link.type = 'image/x-icon';
    top.document.getElementsByTagName('head')[0].appendChild(link);
};

function init() {
    const leftMenu_container = document.querySelector('.left-menu-container');
    const leftMenu = document.querySelector('.left-menu');
    const leftMenu_btn = document.querySelector('.left-menu-btn');
    const closeMenu_btn = document.querySelector('.close-menu-btn');
    const body = document.querySelector('body');
    
    leftMenu_btn.addEventListener('click', () => {
        leftMenu_container.classList.add('active');
        leftMenu.classList.add('active');
        body.style.overflow = 'hidden';
    });
    
    closeMenu_btn.addEventListener('click', () => {
        leftMenu_container.classList.remove('active');
        leftMenu.classList.remove('active');
        body.style.overflow = 'auto';
        const departmentWrapper = document.querySelector('.departments');
        departmentWrapper.style.display = 'none';
        const subDepartmentWrapper = document.querySelector('.sub-departments');
        subDepartmentWrapper.style.display = 'none';
        const departmentItensWrapper = document.querySelector('.department-itens');
        departmentItensWrapper.style.display = 'none';
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
        if (window.innerWidth >= 1024) {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                header.style.height = "70px";
                header.style.position = "fixed";
                navbar.style.marginTop = "70px";
            } else {
                header.style.height = "105px";
                header.style.position = "static";
                navbar.style.marginTop = "0px";
            }
        } else {
            if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
                header.style.position = "fixed";
                body.style.marginTop = "110px";
            }else {
                header.style.position = "static";
                body.style.marginTop = "0px";
            }
        }
    }
    if(window.location.href.includes('')){
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
        if (window.innerWidth >= 1024) {
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
        }

        let departmentID = "";
        const departmentWrapper = document.querySelector('.departments');
        const subDepartmentWrapper = document.querySelector('.sub-departments');
        const departmentItensWrapper = document.querySelector('.department-itens');
        departmentWrapper.innerHTML = '';
        subDepartmentWrapper.innerHTML = '';
        
        let subDepartmentElement = '';
        
        function getDepartmentData() {
            fetch('/src/data/departments_data.json')
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
                        let event = '';
                        if (window.innerWidth < 1024) {
                            event = 'click';
                        } else {
                            event = 'mouseover';
                        }
                        departmentWrapper.addEventListener(event, (e) => {
                            const target = e.target;
                            departmentItensWrapper.innerHTML = '';
                            if (target.id) {
                                departmentID = target.id;
                                if (window.innerWidth < 1024) {
                                    departmentWrapper.style.display = 'none';
                                    subDepartmentWrapper.style.display = 'flex';
                                    subDepartmentWrapper.innerHTML = `
                                    <div class= "buttons">
                                        <button class="backToDep" onclick="backToDepartment()">
                                            <i class="fa-solid fa-angle-left"></i>
                                            Voltar
                                        </button>
                                        <a href="">Ver tudo de ${target.id}</a>
                                    </div>`;
                                 
                                } else {
                                    subDepartmentWrapper.innerHTML = `
                                                <li>
                                                    <a href="">Ver tudo de ${target.id}</a>
                                                </li>`;
                                }         
        
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
        
                                        subDepartmentWrapper.addEventListener(event, (e) => {
                                            const subtarget = e.target;
                                            if (subtarget.id) {
                                                departmentItensWrapper.style.display = 'block';
                                                const subDepartmentID = subtarget.id;
                                                
                                                if (subDepartment[subDepartmentID]) {
                                                    departmentItensWrapper.innerHTML = '';
                                                    if (window.innerWidth < 1024) {
                                                        subDepartmentWrapper.style.display = 'none';
                                                        departmentItensWrapper.innerHTML = `
                                                        <div class= "buttons">
                                                            <button class="backToSubDep" onclick="backToSubDepartment()">
                                                                <i class="fa-solid fa-angle-left"></i>
                                                                Voltar
                                                            </button>
                                                            <a href="">Ver tudo de ${subtarget.id}</a>
                                                        </div>`;
                                                    } else {
                                                        departmentItensWrapper.innerHTML = `
                                                        <li>
                                                            <a href="">Ver tudo de ${subtarget.id}</a>
                                                        </li>`;
                                                    }
                                          
                                                subDepartment[subDepartmentID].forEach(item => {
                                                  const itemElement = `
                                                    <li>
                                                      <a href="">${item}</a>
                                                    </li>`;
                                                  departmentItensWrapper.innerHTML += itemElement;
                                                });
                                              }
                                            }
                                          
                                            subtarget.addEventListener(event, (e) => {
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
        
        getDepartmentData();
    };
    const m_departments_btn = document.querySelector('.departments-btn');
    const m_navbar = document.querySelector('#mobile-nav');
    const departmentWrapper = document.querySelector('.departments');
    const subDepartmentWrapper = document.querySelector('.sub-departments');
    const departmentItensWrapper = document.querySelector('.department-itens');

    m_departments_btn.addEventListener('click', () => {
        if (m_navbar.style.display === 'none') {
            m_navbar.style.display = 'flex';
            departmentWrapper.style.display = 'flex';
            subDepartmentWrapper.style.display = 'none';
            departmentItensWrapper.style.display = 'none';
        }else {
            m_navbar.style.display = 'none';
        }
    });

    if (window.innerWidth < 1024) {
        departmentWrapper.style.display = 'flex';
        subDepartmentWrapper.style.display = 'none';
        departmentItensWrapper.style.display = 'none';
    }
};
function backToDepartment() {
    const departmentWrapper = document.querySelector('.departments');
    departmentWrapper.style.display = 'flex';
    const subDepartmentWrapper = document.querySelector('.sub-departments');
    subDepartmentWrapper.style.display = 'none';
    const departmentItensWrapper = document.querySelector('.department-itens');
    departmentItensWrapper.style.display = 'none';
};
function backToSubDepartment() {
    const subDepartmentWrapper = document.querySelector('.sub-departments');
    subDepartmentWrapper.style.display = 'flex';
    const departmentItensWrapper = document.querySelector('.department-itens');
    departmentItensWrapper.style.display = 'none';
};


if (window.location.href.includes('login.html')) {
    const login_btn = document.querySelector('#login-btn');
    const userImput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const userError = document.querySelector('.user-error');
    const passwordError = document.querySelector('.password-error');
    
    validateUser(userImput, userError);
    validateUser(passwordInput, passwordError);
    
    function validateUser(input, error) {
        input.addEventListener('input', (event) => {
            if (event.target.value !== '') {
                error.style.display = 'none';
                input.style.border = 'solid 1px var(--dark-gray)';
            }else {
                error.style.display = 'block';
                input.style.border = 'solid 1px var(--red)';
            }
            if (userImput.value !== '' && passwordInput.value !== '') {
                login_btn.classList.remove('disabled');
            }else {
                login_btn.classList.add('disabled');
            }
        });
        login_btn.addEventListener('click', () => {
            if (input.value === '') {
                error.style.display = 'block';
                input.style.border = 'solid 1px var(--red)';
            }
        });
    }
    
    const eye = document.querySelector('#eye');
    eye.addEventListener('click', () => {
        if (eye.classList.contains('fa-eye-slash')) {
            eye.classList.remove('fa-eye-slash');
            eye.classList.add('fa-eye');
            passwordInput.type = 'text';
        }else {
            eye.classList.remove('fa-eye');
            eye.classList.add('fa-eye-slash');
            passwordInput.type = 'password';
        }
    });

}
const individualAccoutType = document.querySelector('#individual-input');
const corporateAccoutType = document.querySelector('#corporate-input');
const individualForm = document.querySelector('.individual-form');
const corporateForm = document.querySelector('.corporate-form');
const gerderInfo = document.querySelector('.gender-info');

document.addEventListener('click', (e) => {
    if (e.target.id === 'individual-input') {
        corporateAccoutType.checked = false;
        individualForm.style.display = 'flex';
        corporateForm.style.display = 'none';
        gerderInfo.style.display = 'flex';
    }else if (e.target.id === 'corporate-input') {
        individualAccoutType.checked = false;
        individualForm.style.display = 'none';
        corporateForm.style.display = 'flex';
        gerderInfo.style.display = 'none';
    }
});
document.addEventListener('DOMContentLoaded', () => {
    if (individualAccoutType.checked){
        individualForm.style.display = 'flex';
        corporateForm.style.display = 'none';
        gerderInfo.style.display = 'flex';
    }

});
document.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.checked = true;
});