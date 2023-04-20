import { IconType } from 'react-icons'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import qs from 'query-string'

interface CategoryBoxProps {
  icon: IconType
  label: string
  selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    // 初始化currentQuery为空对象
    let currentQuery = {}

    // 如果params存在，使用qs库将其解析为对象
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    // 更新currentQuery中的category参数为新的label值
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    }

    // 如果当前的category参数已经设置为新的label值，就从updatedQuery中删除category属性
    if (params?.get('category') === label) {
      delete updatedQuery.category
    }
    // 使用qs库将updatedQuery对象转换为字符串，生成一个新的URL
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    )
    // 使用router对象导航到新的URL
    router.push(url)
  }, [label, params, router])
  return (
    <div
      onClick={handleClick}
      className={` 
      flex
      flex-col
      items-center
      justify-center
      gap-2
      p-3
      border-b-2
      hover:text-neutral-800
      transition
      cursor-pointer
      ${selected ? 'border-b-neutral-800' : 'border-transparent'}
      ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}>
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

export default CategoryBox
