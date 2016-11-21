var objA = {

    prop1: 'value1',

    prop2: 'value2',

    prop3: 'value3',

    prop4: {

        subProp1: 'sub value1',

        subProp2: {

            subSubProp1: 'sub sub value1',

            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]

        }

    },

    prop5: 1000,

    prop6: new Date(2016, 2, 10)

};



var objB = {

    prop5: 1000,

    prop3: 'value3',

    prop1: 'value1',

    prop2: 'value2',

    prop6: new Date('2016/03/10'),

    prop4: {

        subProp2: {

            subSubProp1: 'sub sub value1',

            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]

        },

        subProp1: 'sub value1'

    }

};

var a = {
    a: 1,
    b: 2,
    c: 3
},
b = {
    a: 1,
    b: 2,
    c: 4
}
function compareLink(a,b) {
    if (a === b) return true
}

function compareProp(a,b) {
    var a = Object.getOwnPropertyNames(a),
        b = Object.getOwnPropertyNames(b);

   for (var propA of a) {

        for (var propB of b) {
          
            if (propB === propA) {
                console.log(propB+ ' = '+ propA);
                break;
            }
    
        }

        if (propB !== propA) return false
    }

    return true
}

function  compareVal(a,b) {

    for (var propA in a) {

        for (var propB in b) {
          
            if (b[propB] === a[propA]) {
                console.log(b[propB]+ ' = '+ a[propA]);
                break;
            }
    
        }

        if (b[propB] !== a[propA]) return false
    }

    return true
}

function compareSubProp(a,b) {

    for (var propA in a) {
       
        for(var sub in propA) {
            console.log(sub)
        }
    }
}

function deepEqual(a, b) {

    if (compareLink(a,b)) {
        return true
    }

    if (compareProp(a,b)) {
        if (compareVal(a,b)) {
           return true
        }
    } else return false
}

console.log(deepEqual(objA, objB)); //объекты идентичны, вернет true