
const app = new Vue({
    el: '#app',
    data: {
        name: '',
        grade: 1,
        messenger: '',
        orderDate: null,
        phone: '',
        selected_subjects: [2],
        subjects: [
            {
                id: 1,
                name: 'Чистописание',
            },
            {
                id: 2,
                name: 'Чтение',
            },
            {
                id: 3,
                name: 'Природоведение',
            },
            {
                id: 4,
                name: 'Математика',
            },
            {
                id: 5,
                name: 'Английский',
            },
            {
                id: 6,
                name: 'Немецкий',
            },
            {
                id: 7,
                name: 'Граждановедение',
            },
            {
                id: 8,
                name: 'История',
            },
            {
                id: 9,
                name: 'Литература',
            },
            {
                id: 10,
                name: 'ОБЖ',
            },
            {
                id: 11,
                name: 'Технология',
            },
            {
                id: 12,
                name: 'География',
            },
            {
                id: 13,
                name: 'Биология',
            },
            {
                id: 14,
                name: 'Информатика',
            },
            {
                id: 15,
                name: 'Обществознание',
            },
            {
                id: 16,
                name: 'Алгебра',
            },
            {
                id: 17,
                name: 'Геометрия',
            },
            {
                id: 18,
                name: 'Физика',
            },
            {
                id: 19,
                name: 'Химия',
            },
        ],

    },
    methods: {
        activeSubject(subject){
            return this.selected_subjects.includes(subject.id)? 'subject_active subject': 'subject';
        },
        toggleSubject(subject){
            if(this.selected_subjects.includes(subject.id)){
                let selected_index = this.selected_subjects.indexOf(subject.id)
                this.selected_subjects.splice(selected_index, 1);
            }else{
                this.selected_subjects.push(subject.id);
            }
        },
        createOrder(){
            const self = this;
            $.ajax({
                url: '/order/create',
                method: 'POST',
                data: {
                    name: self.name,
                    grade: self.grade,
                    messenger: self.messenger,
                    orderDate: self.orderDate,
                    phone: self.phone,
                    selectedSubjects: JSON.stringify(self.selected_subjects),
                },
                success(resp){
                    console.log(resp);
                },
            })
        }
    }

})

