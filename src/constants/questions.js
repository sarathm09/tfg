import { nanoid } from 'nanoid'
import questions from './questions.json'


const questionsWithId = questions.map(q => ({
    _: q._ || nanoid(),
    ...q,
    p: q.p || 3
}))


const getItemsByPrio = (items) => {
    const itemsByPrio = {}
    items.forEach(item => {
        if (!itemsByPrio[item.p]) {
            itemsByPrio[item.p] = new Set()
        }
        itemsByPrio[item.p].add(item)
    })
    console.log(`Got ${items.length} items`)
    return itemsByPrio
}

const shuffleList = (list) => list.sort(() => Math.random() - 0.5)

const selectItemsFromPrioList = (prioList, numberOfItemsRequired) => {
    let pickedItems = []
    let percentageToBePickedFromPrioList = 95
    let finalListPercentagePerPrio = [45, 30, 25]

    Object.entries(prioList).forEach(([prio, itemsSet]) => {
        const list = [...itemsSet]
        if (!!list && list.length > 0) {
            const numberOfItemsWithPrio = list.length
            const numberOfItemsToPick = Math.min(
                Math.round(numberOfItemsWithPrio * percentageToBePickedFromPrioList / 100),
                Math.round(numberOfItemsRequired * finalListPercentagePerPrio[prio - 1] / 100)
            )
            const shuffledList = shuffleList(shuffleList(shuffleList(list)))

            console.log(`Picking ${numberOfItemsToPick} (${percentageToBePickedFromPrioList}%) of ${numberOfItemsWithPrio} items in prio ${prio}`)

            pickedItems = [
                ...pickedItems,
                ...(shuffledList.slice(0, numberOfItemsToPick))
            ]
            percentageToBePickedFromPrioList -= 20
        }
    })
    return pickedItems
}

const weightedShuffle = (items, numberOfItemsRequired = 100) => {
    const itemsByPrio = getItemsByPrio(items)
    const pickedItems = shuffleList(shuffleList(shuffleList(
        selectItemsFromPrioList(itemsByPrio, numberOfItemsRequired))))
    return pickedItems.map(({ q, _ }) => ({
        id: _,
        question: q,
    }))
}

export { weightedShuffle, questionsWithId as questions }
