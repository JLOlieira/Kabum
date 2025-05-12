window.addEventListener('load', () => {
    const header = document.getElementById('header');
    const navbar = document.getElementById('navbar');

    const fetchHeader = fetch('/src/components/header.html')
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
});

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
    if(window.location.href.includes('index.html')){
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
        getDepartmentData();
    };
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

document.addEventListener('click', (e) => {
    if (e.target.id === 'individual-input') {
        corporateAccoutType.checked = false;
    }else if (e.target.id === 'corporate-input') {
        individualAccoutType.checked = false;
    }
});